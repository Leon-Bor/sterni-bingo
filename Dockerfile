FROM node:14-alpine As Builder 

WORKDIR /app 

COPY . . 

RUN npm install --legacy-peer-deps
RUN npm run build 
RUN npm prune --production 

FROM node:14-alpine

WORKDIR /app 
 
COPY --from=Builder /app ./
RUN rm -rf ./src
VOLUME [ "/usr/src/app/db.json" ]

CMD ["node", "bin/www"]
EXPOSE 80