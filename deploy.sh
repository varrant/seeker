#! /bin/sh
# 先构建
make build
# 再拷贝文件
npm run copy
# 提交代码 并且带提交内容
git add -A
git commit -m "$1"
git push
