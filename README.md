# coin nativate

## 使用

```js
// 1. 下载代码
git clone 
// 2. 本地安装包
npm i 或者 cnpm i

// 3.假设已启动mongodb，启动本地服务器
node server/app.js

// 4. 运行项目
npm run serve

// 在后台运行
nohup npm run dev >/dev/null 2>&1 &

// 5. 预览项目
http://localhost:8080

// 如果使用pm 管理
pm2 start npm --name coin_nav_web -- run serve --env production
pm2 start --name coin_nav_node server/app.js --env production

// 每次更新执行
pm2 restart coin_nav_web
pm2 restart coin_nav_node

```