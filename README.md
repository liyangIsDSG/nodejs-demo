# nodejs-demo
一个简易的用来升级package.json里版本的脚本的 demo

## 运行环境
需要引入 fs-extra 包，版本什么的都无所谓

## 运行
npm run updateV --type=minor; type的值决定升级 主版本号 | 次版本号 | 补丁版本号
默认不传的情况下为 升级次版本号
