.PHONY: app
default: help

install:
	npm install

dev:
	npm run dev

build:
	npm run dist

deploy:
	@npm run deploy

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发编译模式"
	@echo "   \033[35mmake build\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  构建项目，生成pro环境代码"
	@echo "   \033[35mmake deploy\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  部署"
