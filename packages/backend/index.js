const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');
const i18next = require('./i18n');

const validBookings = [
  { bookingCode: 'ABCD123', familyName: 'DIOR' },
  { bookingCode: 'EFGH123', familyName: 'SOLAR' },
];

const typeDefs = `#graphql
  type Label {
    bookingCode: String
    familyName: String
    checkIn: String
  }

  type CheckinError {
    code: String
    description: String
  }

  type CheckinResponse {
    success: Boolean
    message: String
    error: CheckinError
  }

  type Query {
    labels: Label
  }

  type Mutation {
    checkin(bookingCode: String!, familyName: String!): CheckinResponse
  }
`;

const resolvers = {
  Query: {
    labels: (_, __, { t }) => {
      return {
        bookingCode: t('bookingCode'),
        familyName: t('familyName'),
        checkIn: t('checkIn'),
      };
    },
  },
  Mutation: {
    checkin: (_, { bookingCode, familyName }, { t }) => {
      // Mocking scenarios based on booking code
      if (bookingCode === 'NOT_YET_AVAILABLE') {
        return {
          success: false,
          error: {
            code: '9003',
            description: t('errors.9003'),
          },
        };
      }
      if (bookingCode === 'CLOSED') {
        return {
          success: false,
          error: {
            code: '9004',
            description: t('errors.9004'),
          },
        };
      }
      if (familyName.length < 2) {
        return {
          success: false,
          error: {
            code: '9002',
            description: t('errors.9002'),
          },
        };
      }

      const isValidBooking = validBookings.some(
        (booking) =>
          booking.bookingCode.toUpperCase() === bookingCode.toUpperCase() &&
          booking.familyName.toUpperCase() === familyName.toUpperCase(),
      );

      if (!isValidBooking) {
        return {
          success: false,
          error: {
            code: '9001',
            description: t('errors.9001'),
          },
        };
      }

      // Success
      return {
        success: true,
        message: t('success.checkInConfirmation'),
      };
    },
  },
};

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/newapp/checkin', // As per requirements
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const lng = req.headers['accept-language'] || 'en';
        const t = await i18next.changeLanguage(lng);
        return { t };
      },
    }),
  );

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/newapp/checkin`);
  });
};

startServer(); 