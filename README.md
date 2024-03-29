# Household App
This product holds an application to keep track of household activities and records (eg. schedules, spendings, ...)

## Requirements

## Run instantly
1. Set up docker container, and automatically start app.
```shell
$ docker compose up
```

## Run on development mode
1. Remove `command` key, to disable automatic starting.
```yaml
...
  # command: >
  #   sh -c "yarn start"
```

2. Set up docker container, and enter container.
```shell
$ docker compose up -d && docker compose exec app bash
```

3. Run application.
```shell
(container) $ yarn start
```
- To access on web browser, access [localhost](http://localhost:8081/).
  - To use a tunnel URL, use option `--tunnel`.
- To access on iOS device (iPhone, etc.), read QR code via `Expo Go` app.

## Functions
- Household account book
- Calendar (Schedule)
