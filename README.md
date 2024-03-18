# Gossip

## Getting started

> clone the repo:

```bash
git clone https://github.com/david-brt/Gossip.git
```

> start the backend and server:

-   navigate to project root and run `docker-compose up -d`

> start the frontend:

-   navigate to the frontend directory and run `npm run start`

### interact with the database

> The project uses [sqlc](https://sqlc.dev/) to allow type safe database access.

-   to add or update queries, edit sql/query.sql
-   navigate to the server directory and run `sqlc generate`
