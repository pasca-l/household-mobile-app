# Household Mobile App
This product holds an mobile application to keep track of household activities and records (eg. spendings, vaults, ...)

## Screenshots

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
(container) $ npm install && npm start
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
- Password manager (vaults)

## Possibilities
- Add Deadline keeper?
  - For warranty
- Add Milestones keeper? (todo list)
- Add Menu for a week?
- Add Anniversary reminder?
- Add Image folder?
  - Sharing documents
- Use gluestack-ui
