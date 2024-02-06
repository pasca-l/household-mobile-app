# Household App
This product holds an application to keep track of household activities and records (eg. schedules, spendings, ...)

## Requirements

## Run on development mode
1. Set up docker container, and enter container.
```shell
$ docker compose up -d && docker compose exec app bash
```

### Run on web browser
1. Run application, and access [localhost](http://localhost:8081/).
```shell
(container) $ yarn start
```

### Run on iOS device (iPhone, etc.)
1. Install `Expo Go` application on the iOS device.

2. Run application, and read QR code.
```shell
(container) $ yarn start
```
- To use a tunnel URL, use option `--tunnel`.
