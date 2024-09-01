FROM node:18-alpine3.18 as builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginxinc/nginx-unprivileged:alpine as runtime

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf