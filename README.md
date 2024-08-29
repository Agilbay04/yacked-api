# Yacked Api (On Development)
APIs for Yacked App (simple app like Twitter)

# Tech Stack
1. [Node.js](https://nodejs.org/en)
2. [Express.js](https://expressjs.com/)
3. [PostgreSQL](https://www.postgresql.org/)
4. [Prisma ORM](https://www.prisma.io/)
5. [Docker](https://www.docker.com/)

# How To Install
1. Clone this repository
2. Run ``` npm install ```
3. If you don't have a Docker download first on this official website: [Download Docker](https://www.docker.com/products/docker-desktop/)
4. Create ``` Dockerfile ``` file and then copy inside file ``` Dockerfile.example ``` to ``` Dockerfile ```
5. Create ``` docker-compse.yml ``` file and then copy inside file ``` docker-compose.example.yml ``` to ``` docker-compose.yml ```
6. Run ``` docker compose --build -d ``` to build image and container
7. Create ``` .env ``` file and then copy inside file ``` .env.example ``` to ``` .env ```
8. Edit your config database on ``` .env ``` file
9. Run ``` npx prisma init ``` to initiate prisma orm
10. Copy inside ``` scheme.example.prisma ``` file into ``` ./prisma/scheme.prisma ```
11. Run ``` npx prisma db push ``` to push model into database
12. Run ``` npx prisma migrate dev ``` to migrate database.
