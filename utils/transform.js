const fse = require('fs-extra')
const path = require('path')
const { exec } = require('child_process')
const { getFileName } = require('./file')

const DIST_FFMPEG_PATH = path.join(__dirname, '..', 'uploadFiles/ffmpeg')
fse.pathExists(DIST_FFMPEG_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FFMPEG_PATH)
  }
})

module.exports = async function (filePath) {
  const fileName = getFileName(filePath),
    dirtName = path.join(DIST_FFMPEG_PATH, fileName)
  const currentM3u8 = `${dirtName}/${fileName}`

  const createVideoTs = `ffmpeg -y -i "${path.join(
    __dirname,
    '..',
    'uploadFiles',
    filePath
  )}" -vcodec copy -acodec copy "${currentM3u8}.ts"`

  const createM3u8 = `ffmpeg -i "${currentM3u8}.ts" -c copy -map 0 -f segment -segment_list "${dirtName}/index.m3u8" -segment_time 10 "${currentM3u8}-%04d.ts"`

  const m3u8 = `/ffmpeg/${fileName}/index.m3u8`

  try {
    fse.pathExists(dirtName).then((exist) => {
      if (exist) {
        return [m3u8, dirtName]
      }
    })
    fse.ensureDir(dirtName)

    await executeCommand(createVideoTs)
    await executeCommand(createM3u8)

    return [m3u8, dirtName]
  } catch (err) {
    console.log('🚀 ~ err:', err)
    return null
  }
}

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}
