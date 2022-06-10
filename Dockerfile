
# build
FROM node:14-alpine as build
WORKDIR /app
RUN apk add --no-cache git
COPY . /app/
RUN npm install
RUN npm run lint
RUN npm run build

# prod
FROM nginx:1.21.6-alpine as runner
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD nginx -g 'daemon off;'
