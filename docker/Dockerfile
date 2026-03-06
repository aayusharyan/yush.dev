# Lightweight Nginx container for serving the static portfolio site.
# Build context is the repo root; paths are relative to that.
# The version label is updated automatically by the release workflow.

FROM nginx:alpine

LABEL version="0.0.0"

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
