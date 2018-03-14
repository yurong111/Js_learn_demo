/**
 * Created by smilen on 14/03/2018.
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

//cors跨域解决方案
// const cors = require('@koa/cors');
// app.use(cors());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();

    switch (ctx.req.url) {
        case '/cors':
            let html =  '<h1>Hello, koa2!</h1>';
            ctx.response.type = 'text/html';
            ctx.response.body = html;
            break;

        case '/jsonp':
            var callback = ctx.req.query.callback;
            let content = callback+"({'message': '测试'})";
            ctx.res.send(content);
            break;
    }
});

// 在端口3000监听:
app.listen(3500);
console.log('app started at port 3500...');