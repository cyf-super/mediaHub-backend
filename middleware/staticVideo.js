const fs = require('fs')
const path = require('path')
const m3u8 = require('../utils/transform')


module.exports = function () {
  return async function (ctx, next) {
    try {
      const url = decodeURIComponent(ctx.request.url)
      console.log("🚀 ~ url:", url, url.startsWith('/video'))
      if (url.startsWith('/video')) {
        const path = await m3u8(url)
        ctx.body = path
        //   let range = ctx.headers.range; // 实际上请求头的 Range 视屏调节请求会自动带上开始内容 类似这样 Range: bytes=26214400-
        //   if (!range) {
        //     // 初始化请求不会带上range 造一个 并且返回200
        //     range = "bytes=0-";
        //     ctx.status = 200
        //   } else {
        //     // 带range的请求返回 206 表明返回目标url上的部分内容
        //     ctx.status = 206
        //   }
        //   let startBytes = range.replace(/bytes=/, "").split("-")[0];
        //   startBytes = Number(startBytes);
        //   const filepath = path.join(__dirname, '..', 'uploadFiles', url);
        //   let stats = fs.statSync(filepath);
        //   ctx.set("Accept-Ranges", "bytes")
        //   console.log("bytes " + startBytes + "-" + (stats.size - 1) + "/" + stats.size)
        //   ctx.set("Content-Length", stats.size - startBytes)
        //   ctx.set("Content-Range", "bytes " + startBytes + "-" + (stats.size - 1) + "/" + stats.size)
        //   ctx.set("Content-Type", "video/mp4")
        //   ctx.body = fs.createReadStream(filepath, {
        //     start: startBytes,
        //     end: stats.size
        //   })
        // } else if (url.startsWith === '/image') {
        //   // 没有范围请求，直接返回整个文件
        //   const videoPath = path.join(__dirname, '..', 'uploadFiles', url);
        //   const stat = fs.statSync(videoPath);
        //   ctx.response.set('Content-Length', stat.size);
        //   ctx.body = fs.createReadStream(videoPath);
        // }
      }

    } catch (e) {
      console.log("🚀 ~ e:", e)
    }

    await next()
  }
}