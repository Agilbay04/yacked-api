# Yacked App
API's for Yacked App (simple app like a Twitter)

# How To Install
## 1.) Clone this repository
## 2.) Run ``` npm install ```
## 3.) Create ``` Dockerfile ``` file and then copy inside file ``` Dockerfile.example ``` to ``` Dockerfile ```
## 4.) Create ``` docker-compse.yml ``` file and then copy inside file ``` docker-compose.example.yml ``` to ``` docker-compose.yml ```
## 5.) Run ``` docker compose --build -d ```, if you don't have a Docker download first on this official websites: [Docker Official Sites](https://www.docker.com/products/docker-desktop/)
## 6.) Create ``` .env ``` file and then copy inside file ``` .env.example ``` to ``` .env ```
## 7.) Edit your config database on ``` .env ``` file
## 8.) Run ``` npx prisma init ``` to initiate prisma orm 
## 9.) Copy inside ``` scheme.example.prisma ``` file into ``` ./prisma/scheme.prisma ```
## 10.) Run ``` npx prisma db push ``` to push model into database
## 11.) Run ``` npx prisma migrate dev ``` to migrate database
