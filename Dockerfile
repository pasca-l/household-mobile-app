FROM --platform=linux/amd64 node:20.11.0-bookworm-slim

WORKDIR /home/local/

# install necessary packages
RUN apt-get update && apt-get upgrade -y
RUN yarn add expo@50.0.14
RUN yarn install
