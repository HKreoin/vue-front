preview:
	npx vite preview --port 8080

install:
	npm install

dev:
	npx vite

build:
	npx vite build

serve:
	npx serve -s dist

lint:
	npx eslint .

format:
	npx prettier --write src

clean:
	rm -rf dist

.PHONY: preview build serve lint format clea