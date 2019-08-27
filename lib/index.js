const url = require('url')
exports = module.exports = function historyApi(options) {
  options = options || {}
  return async (ctx, next) => {
    var headers = ctx.headers
    if (ctx.method !== 'GET') {
      return next()
    } else if (!headers || typeof headers.accept !== 'string') {
      return next()
    } else if (headers.accept.indexOf('application/json') === 0) {
      return next()
    } else if (!acceptsHtml(headers.accept, options)) {
      // 不接受options.htmlAcceptHeaders中内容
      return next()
    }

    var parseUrl = url.parse(ctx.url)
    var redirectTarget
    var pathname = parseUrl.pathname
    if (pathname.lastIndexOf('.') > pathname.lastIndexOf('/')) {
      return next()
    }
    
    redirectTarget = options.index || '/index.html'
    ctx.url = redirectTarget
    await next()
  }
}

function acceptsHtml(header, options) {
  console.log(header)
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
  for (var i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}