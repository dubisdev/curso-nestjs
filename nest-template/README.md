# Nest Template

1. Clonar repo
2. ```pnpm install```
3. Crear el archivo `.env` a partir del archivo `.env.template`
4. Cambiar las variables de entorno
5. Levantar la base de datos con Docker

    ```bash
    docker compose up -d
    ```

6. Ejecutar Seed

    ```http
    http://localhost:3000/api/seed
    ```

7. Levantar dev ```pnpm start:dev```
