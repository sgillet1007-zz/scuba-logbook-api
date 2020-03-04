# Scuba Logbook API

> A RESTful API for a scuba diving logbook web application implemented as a Node/Express HTTP server with a MongoDB database.

## Instructions for running locally

### Install dependencies

```bash
npm install
```

### Configuration

Add config/config.env file with the following key-value pairs (see below). Replace values with your own values as needed.

```bash
NODE_ENV=development
PORT=[SPECIFY_A_PORT]

JWT_SECRET=[SPECIFY_A_JWT_SECRET_STRING]
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
MONGO_URI=[INCLUDE_YOUR_MONGODB_CONNECTION_STRING_HERE]

SMTP_HOST=[SPECIFY_SMTP_HOST]
SMTP_PORT=[SPECIFY_SMTP_PORT]
SMTP_EMAIL=[SPECIFY_SMTP_EMAIL]
SMTP_PASSWORD=[SPECIFY_SMTP_PASSWORD]
FROM_EMAIL=[SPECIFY_FROM_EMAIL]
FROM_NAME=[SPECIFY_FROM_NAME]
```

### Run Server

```bash
npm run start  # starts your server on specified $PORT
```

## Production URL & API Documentation

To view the API documentation or to consume the API simply navigate to [scubaloggit.net](https://scubaloggit.net)
