# README.md

koa2的一个中间件，用于处理vue-router使用history模式返回index.html，让koa2支持SPA应用程序。 \
搬运的一个express中间件，能够在koa中使用，并且简化了很多
[bripkens作者的connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)

## Install

```bash
$ npm install --save 'koa-history-api'
```

## Use

使用方法如下：

```javascript
const Koa = require('koa');
const history = require('koa-history-api');

const app = new Koa();

// handle fallback for HTML5 history API
app.use(history());

// other middlewares
app.use(...);
```

## index
```javascript
const Koa = require('koa');

const history = require('koa-history-api');

// create app
const app = new Koa();

// use history
// 支持自定义重定向url
app.use(history({index: '/index.html'}));

// other middlewares
app.use(...);

```
## htmlAcceptHeaders
匹配HTML内容请求时的默认请求头(default: ['text/html', '*/*'])
当请求该字段定义值时返回指定html
```javascript
history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
})
```

# LICENSE

Follow [MIT License](/LICENSE)
