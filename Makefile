up:
	docker compose up -d --force-recreate
build:
	docker compose up -d --build
front:
	docker compose exec frontend sh
back:
	docker compose exec backend sh
