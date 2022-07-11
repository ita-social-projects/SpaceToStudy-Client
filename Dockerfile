
# build
FROM node:14-alpine as build
WORKDIR /app
RUN cat .env
RUN echo "REACT_APP_API_BASE_PATH=https://s2s-back-stage.azurewebsites.net" >> .env
RUN cat .env
RUN apk add --no-cache git
COPY . /app/
RUN cat .env
RUN npm install
RUN npm run lint
RUN npm run build
RUN cat .env

# prod
FROM nginx:stable
ARG password
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/get-env.sh /usr/share/nginx/html/get-env.sh
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
RUN cat /usr/share/nginx/html/env.js
RUN apt-get update && apt-get install openssh-server sudo -y
RUN mkdir -p /tmp && chmod +x /usr/share/nginx/html/get-env.sh
RUN echo "root:${password}" | chpasswd 
COPY ./sshd_config /etc/ssh/
COPY ./ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null) \ 
    && service ssh restart
EXPOSE 80 2222
CMD /usr/sbin/sshd && sh /usr/share/nginx/html/get-env.sh && nginx -g 'daemon off;'
RUN cat /usr/share/nginx/html/env.js