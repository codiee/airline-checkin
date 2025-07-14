const i18next = require('i18next');
const FsBackend = require('i18next-fs-backend');

i18next
  .use(FsBackend)
  .init({
    // lng: 'en', // if you want to use a default language
    fallbackLng: 'en',
    backend: {
      loadPath: '/Users/mac/Downloads/airline-checkin/packages/backend/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

module.exports = i18next; 