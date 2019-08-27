exports = module.exports = function historyApi(options) {
  options = options || {}
  return async (ctx, next) => {
    var headers = ctx.headers
    if (ctx.method !== 'GET') {
      await next()
    } else if (!headers || typeof headers.accept !== 'string') {
      await next()
    } else if (headers.accept.indexOf('application/json') === 0) {
      await next()
    } else if (!acceptsHtml(headers.accept, options)) {
      // 不接受options.htmlAcceptHeaders中内容
      await next()
    }
    var redirectTarget = options.index || '/index.html'
    ctx.url = redirectTarget
    await next()
  }
}

function acceptsHtml(header, options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
  for (var i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}