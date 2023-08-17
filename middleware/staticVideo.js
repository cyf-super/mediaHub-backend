const fs = require('fs')
const path = require('path')


module.exports = function () {
  return async function (ctx, next) {
    try {
      const url = decodeURIComponent(ctx.request.url)
      if (url.startsWith === '/video') {
        const videoPath = path.join(__dirname, '..', 'uploadFiles', url);
        const stat = fs.statSync(videoPath);

        // 设置响应头
        ctx.response.set({
          'Content-Type': 'video/mp4',
          'Content-Length': stat.size,
          'Accept-Ranges': 'bytes'
        });

        // const parts = range.replace(/bytes=/, '').split('-');
        const start = 0;
        const end = stat.size - 1
        const chunkSize = (end - start) + 1;

        // 设置分块响应状态
        ctx.response.status = 206;
        ctx.response.set({
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Content-Length': chunkSize
        });
        // 以流的方式逐块发送
        const fileStream = fs.createReadStream(videoPath, { start, end });
        ctx.body = fileStream;
      } else if (url.startsWith === '/image') {
        // 没有范围请求，直接返回整个文件
        const videoPath = path.join(__dirname, '..', 'uploadFiles', url);
        const stat = fs.statSync(videoPath);
        ctx.response.set('Content-Length', stat.size);
        ctx.body = fs.createReadStream(videoPath);
      }
    } catch (e) {
      console.log("🚀 ~ e:", e)
    }

    await next()
  }
}