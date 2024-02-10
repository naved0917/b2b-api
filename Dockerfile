FROM node:16.18.0 AS builder
WORKDIR /src
ENV PORT=80
ENV NODE_ENV=uat
ENV DB_URL = "mongodb://ajaysirdb:bm3D8v7EEOD99EAhaO3KNuC7KcXJ6jdxjAy9tCq7zGEt4wUMiyXNfEBVBTeF3mvXFHHZ5ywYloQc2TS9sFumMw==@ajaysirdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ajaysirdb@"

# ENV MAIL_HOST=smtp-mail.outlook.com
# ENV MAIL_USER=bizzexpo@scorpius.com.my
# ENV MAIL_PASSWORD=Gak56062
# ENV MAIL_FROM=bizzexpo@scorpius.com.my

ENV MAIL_HOST=smtp.gmail.com
ENV MAIL_USER=learnnownoreply@gmail.com
# ENV MAIL_PASSWORD=learnnownoreply@123
ENV MAIL_PASSWORD=aqoxmgkcenmcsozr
ENV MAIL_FROM=learnnownoreply@gmail.com

ENV AZURE_STORAGE_SAS_KEY="?sv=2021-06-08&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2022-11-30T13:56:39Z&st=2022-11-24T05:56:39Z&spr=https,http&sig=IUMb6kSJ4BRdERvxj%2FtUNIMp28xBVQIAfHnaoN0fymM%3D"
ENV  AZURE_STORAGE_ACCOUNT="ajayshankar"


ENV CONTAINER_NAME="b2b"
ENV AZURE_BLOB_STRING="BlobEndpoint=https://ajayshankar.blob.core.windows.net/;QueueEndpoint=https://ajayshankar.queue.core.windows.net/;FileEndpoint=https://ajayshankar.file.core.windows.net/;TableEndpoint=https://ajayshankar.table.core.windows.net/;SharedAccessSignature=sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2022-12-29T14:09:35Z&st=2022-11-24T06:09:35Z&spr=https,http&sig=DNfyYWhlKF2VJygkLkqzf7J%2FNCnLCDq2ThwGLOVGuRU%3D"
ENV DB_URL = mongodb://ajaysirdb:bm3D8v7EEOD99EAhaO3KNuC7KcXJ6jdxjAy9tCq7zGEt4wUMiyXNfEBVBTeF3mvXFHHZ5ywYloQc2TS9sFumMw==@ajaysirdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ajaysirdb@

COPY ./package.json ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM node:16.18.0
WORKDIR /app
COPY --from=builder /src ./
CMD ["npm","run", "start:prod"]
EXPOSE 80

