# Airline Check-in

This is a monorepo project for an airline check-in system, containing both frontend and backend applications.

## Project Structure

```
/airline-checkin
├── package.json
├── packages/
│   ├── app/         # Angular frontend application
│   └── backend/     # Node.js backend server
```

### Frontend (`packages/app`)
- Built with Angular
- Main files: `src/main.ts`, `src/app/app.component.ts`, `src/app/check-in/check-in.component.ts`
- Configuration: `angular.json`, `tsconfig*.json`

### Backend (`packages/backend`)
- Built with Node.js
- Main files: `index.js`, `i18n.js`
- Localization: `locales/en/translation.json`, `locales/nl/translation.json`

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v7 or higher recommended)

### Install Dependencies

From the root directory:

```bash
npm install
```

This will install dependencies for all workspaces.

### Running the Frontend

```bash
cd packages/app
npm start
```

### Running the Backend

```bash
cd packages/backend
npm start
```

## Scripts

- `npm install` — Installs all dependencies for the monorepo
- `npm start` — Starts the respective app (run inside `app` or `backend` folder)

## Localization

The backend supports English (`en`) and Dutch (`nl`) translations. Translation files are located in `packages/backend/locales/`.

## License

This project is licensed under the ISC License.
