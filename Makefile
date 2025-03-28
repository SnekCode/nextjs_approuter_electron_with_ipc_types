# Define commands for each task
.PHONY: next_dev next_build next_start next_lint format postinstall electron_dist electron_dist_deb electron_build build dist dev electron_build_watch electron_dev

# Define the default target
default: help

# Next.js tasks
next_dev:
	npm next dev --turbo

next_build:
	NODE_ENV=production npm next build

next_start:
	npm next start

next_lint:
	npm next lint

# Formatting task
format:
	npm dprint fmt

# Electron tasks
postinstall:
	npm electron-builder install-app-deps

electron_dist:
	npm electron-builder --dir

electron_dist_deb:
	npm electron-builder --linux deb

electron_build:
	npm tsup

electron_build_watch:
	npm tsup --watch

electron_dev:
	npm cross-env NODE_ENV='development' nodemon

# Composite tasks
build:
	make next_build && make electron_build

dist:
	make next_build && make electron_dist

dev:
	make next_dev & make electron_dev & make electron_build_watch

# Help task to list available tasks
help:
	@echo "Available tasks:"
	@echo "  make next_dev           - Development server for Next.js"
	@echo "  make next_build         - Build Next.js project"
	@echo "  make next_start         - Start Next.js project"
	@echo "  make next_lint          - Lint Next.js project"
	@echo "  make format             - Format code"
	@echo "  make postinstall        - Install app dependencies for Electron"
	@echo "  make electron_dist      - Build Electron for distribution in directory mode"
	@echo "  make electron_dist_deb  - Build Electron for Debian distribution"
	@echo "  make electron_build     - Build Electron using tsup"
	@echo "  make build              - Build both Next.js and Electron projects"
	@echo "  make dist               - Distribute both Next.js and Electron projects"
	@echo "  make dev                - Development mode for both Electron and Next.js"
	@echo "  make electron_build_watch - Watch mode for Electron with tsup"
	@echo "  make electron_dev       - Development mode for Electron"
