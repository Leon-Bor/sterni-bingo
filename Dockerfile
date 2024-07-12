FROM node:14-alpine As Builder 

WORKDIR /app 

COPY . . 

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm install --legacy-peer-deps
RUN npm run build 
RUN npm prune --production 

FROM node:14-alpine

WORKDIR /app 

COPY --from=Builder /app ./
RUN rm -rf ./src
VOLUME [ "/app/store" ]

EXPOSE 3000
CMD ["node", "bin/www"]