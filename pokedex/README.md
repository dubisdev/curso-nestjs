# Pokedex Project

Project created with:

- NestJS
- MongoDB

## Project Setup

### Development Environment

Prerequisites:

- Docker Desktop
- Bun
- Nest CLI

1. Clone the repository
2. Install deps:

    ```bash
    bun i
    ```

3. Have Nest CLI installed globally:

    ```bash
    npm i -g @nestjs/cli
    ```

4. Start the docker DB:

    ```bash
    docker compose up -d
    ```

5. Clone the __env.template__ file to __.env__ and fill in the required values.
6. Run the application:

    ```bash
    bun run start:dev
    ```

7. Rebuild the database using the /seed endpoint:

    ```bash
    curl -X POST http://localhost:3000/seed
    ```
