# Lightweight Nginx container for serving the static portfolio site.
# Build context is the repo root. Source files live under src/ and
# are copied into the Nginx document root. The version label is
# updated automatically by the release workflow.

FROM nginx:alpine

LABEL version="0.1.0"

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY src/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
