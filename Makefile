.PHONY: app

app:
	docker compose -f docker-compose.prod.yml up
