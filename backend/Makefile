.PHONY: format lint fix test check db-up db-down db-logs

format:
	uv run black .
lint:
	uv run ruff check .
fix:
	uv run ruff check . --fix
	uv run black .

test:
	PYTHONPATH=. uv run pytest -q

check:
	uv run ruff check .
	uv run black --check .
	PYTHONPATH=. uv run pytest -q

install:
	uv sync

run:
	uv run uvicorn src.main:app --reload

worker:
	uv run celery -A src.workers.celery_app worker --loglevel=info

db-up:
	docker compose up -d postgres

db-down:
	docker compose down

db-logs:
	docker compose logs -f postgres