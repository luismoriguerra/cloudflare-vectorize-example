
PROJECT_NAME=rag-ai-tutorial

dev:
	npx wrangler dev --remote

deploy:
	npx wrangler deploy

create-vector-db-768:
	npx wrangler vectorize create $(PROJECT_NAME)-768 --dimensions=768 --metric=cosine

