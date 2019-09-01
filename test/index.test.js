const koaHistoryApi = require('../lib/index')
const sinon = require('sinon')

describe('koa-history-api', () => {
    let middleware
    let ctx = null
    let url
    let next

    beforeEach(() => {
        middleware = koaHistoryApi()
        url = '/bar'
        ctx = {
            method: 'GET',
            url,
            headers: {
                accept: 'text/html, */*'
            }
        }
        next = sinon.stub()
    })

    ;['POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'].forEach(method => {
        console.log(ctx)
        it(`必须允许 ${method} 请求`, () => {
            ctx.method = method
            middleware(ctx, next)
            expect(ctx.url).toBe(url)
            expect(next.called).toEqual(true)
        })
    })

    it('没有accept html时应该请求通过', () => {
        ctx.headers.accept = 'application/json'
        middleware(ctx, next)
        expect(ctx.url).toBe(url)
        expect(next.called).toBe(true)
    })

    it('文件请求应当通过', () => {
        var expected = ctx.url = 'js/index.js'
        middleware(ctx, next)
        expect(ctx.url).toBe(expected)
        expect(next.called).toBe(true)
    })

    it('当请求中有.号，且位置在/之前，应重写url', () => {
        ctx.url = 'js/bar.test/koa'
        middleware(ctx, next)
        expect(ctx.url).toBe('/index.html')
        expect(next.called).toBe(true)
    })

    it('以json来源为首选项时', () => {
        ctx.headers.accept = 'application/json, text/plain, */*'
        middleware(ctx, next)
        expect(ctx.url).toBe(url)
        expect(next.called).toBe(true)
    })

    it('当缺少请求参数时', () => {
        middleware(ctx, next)
        expect(ctx.url).toBe('/index.html')
        expect(next.called).toBe(true)
    })

    it('当没有accept请求头时', () => {
        delete ctx.headers.accept
        middleware(ctx, next)
        expect(ctx.url).toBe(url)
        expect(next.called).toBe(true)
    })

    it('没有header对象时', () => {
        delete ctx.headers
        middleware(ctx, next)
        expect(ctx.url).toBe(url)
        expect(next.called).toBe(true)
    })

    it('应该可以在传入index参数时生效', () => {
        var index = '/public/index.html'
        middleware = koaHistoryApi({ index })
        middleware(ctx, next)
        expect(ctx.url).toBe(index)
        expect(next.called).toBe(true)
    })

    it('应该接受htmlAcceptHeaders参数', () => {
        ctx.headers.accept = '*/*'
        middleware = koaHistoryApi({htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']})
        middleware(ctx, next)
        expect(ctx.url).toBe(url)
        expect(next.called).toBe(true)
    })
})