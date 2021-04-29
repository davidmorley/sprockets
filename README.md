# Sprocket Factory Backend Challenge

## Install dependencies

### Install Docker Compose

Refer to the documentation on the Docker site on [how to install Docker Compose](https://docs.docker.com/compose/install/).

### Install application dependencies

In the `sprockets-service` directory, install the application's dependencies by running:

```bash
yarn
```

## Get up and running!

### Start the database

You can start the PostgreSQL database containing its seed data by running:

```bash
docker compose up
```

### Start the application

You can start the Express application in development mode by setting the required PostgreSQL environment variables and by running `yarn dev` in the `sprockets-service` directory:

```bash
PGUSER=sprockets \
PGPASSWORD=secret \
PGHOST=localhost \
PGPORT=5432 \
PGDATABASE=sprockets \
yarn dev
```
