# Household App <!-- omit in toc -->
This product holds an application to keep track of household activities and records (eg. schedules, spendings, ...)

## Table of contents <!-- omit in toc -->
- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [Run on development mode](#run-on-development-mode)
- [Run on production mode](#run-on-production-mode)
- [Functions](#functions)

## Requirements
- Docker 25.0.3
- Docker Compose v2.24.6

## Dependencies
- Expo
- React Native Paper
- Firebase

## Run on development mode
> Development mode binds the installed package modules to the local folder, in order for editor linters to work properly.

1. Set up docker container, and enter container.
```shell
$ docker compose up -d && docker compose exec app bash
```

2. Run application.
```shell
(container) $ yarn install && yarn start
```
- To access on web browser, access [localhost](http://localhost:8081/).
  - To use a tunnel URL, use option `--tunnel`.
- To access on iOS device (iPhone, etc.), read QR code via `Expo Go` app.

## Run on production mode
1. Set up docker container, and automatically start app.
```shell
$ make app
```

## Functions
- Household account book
- Calendar (schedule)
- Image folder?
  - Keeping receipts
  - Sharing documents
