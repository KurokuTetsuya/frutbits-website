FROM node:12-alpine

LABEL name "FrutBits-Website"

WORKDIR /usr/website

COPY . .

RUN echo [INFO] ✨ Installing build deps.. \
    && apk add --no-cache --virtual .build-deps python g++ make yarn \
    && echo [INFO] 🗑️ Cleanning package cache.. \
    && yarn cache clean \
    && echo [INFO] 🔗 Installing dependencies.. \
    && yarn install \
    && echo [INFO] 🗑️ Cleanning Dev dependencies.. \
    && yarn install --production \
    && apk del .build-deps

EXPOSE 8080
CMD ["node", "index"]