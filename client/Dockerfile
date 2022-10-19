FROM node:16 AS builder
LABEL maintainer="kyle@apollographql.com"
ENV NODE_ENV=production
WORKDIR /client

COPY package*.json .
RUN npm install

COPY src ./src
COPY public ./public
RUN npm run build

###########
## NGINX ##
###########

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
# Copy built assets from builder stage into html folder for Nginx to serve
COPY --from=builder /client/build .

# Expose app on port 80...
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]