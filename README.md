# zagmuk

> It celebrates the triumph of Marduk

A frontend application to display data pipeline events from [nabu](https://github.com/entur/nabu), and to upload and validate datasets.

## Local development

This app is a micro-frontend designed to run inside the Ninkasi host application. For local development without the host app, a standalone mode with mock data is available.

### Standalone mode with mock data

Create a `.env.development.local` file (gitignored):

```
VITE_STANDALONE=true
VITE_ENV=dev
```

Then run:

```
npm start
```

This renders the app at http://localhost:3000 with mock pipeline events and a mock provider. API calls to the events endpoint are intercepted and return sample data (one successful run, one failed run, and one older successful run).