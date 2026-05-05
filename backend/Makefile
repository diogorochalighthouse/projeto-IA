.PHONY: install run worker

install:
	uv sync

run:
	uv run uvicorn src.main:app --reload

worker:
	uv run celery -A src.workers.celery_app worker --loglevel=info