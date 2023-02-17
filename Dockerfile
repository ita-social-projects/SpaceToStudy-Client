# Build target 'build' #
########################
FROM node:18.14.0-alpine as build
WORKDIR /app
RUN apk add --no-cache git
COPY . /app/
RUN ls /app/
RUN npm install
RUN npm run lint
RUN npm run build
RUN ls /app/

# Build target 'production' #
#############################
FROM nginx:stable-alpine
VOLUME /sys/fs/cgroup
ARG password
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
RUN apk add --update --no-cache sudo openrc openssh bash \
    && mkdir /run/openrc/ && touch /run/openrc/softlevel \
    && mkdir -p /tmp && echo "root:${password}" | chpasswd
COPY ./sshd_config /etc/ssh/
COPY ./ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null) \
    && rc-update add sshd \
    && rc-update add nginx \
    && rc-status \
    && rc-service sshd restart
EXPOSE 80 2222
CMD /usr/sbin/sshd && nginx -g 'daemon off;'
