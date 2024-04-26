/**
 * status: 0-失败，1-成功，2-警告
 */

// 用户信息
const userInfo = {
  loginFailInfo: {
    code: '10001',
    message: '用户名或密码错误',
  },
  userParamsError: {
    code: '10002',
    message: '参数格式不对',
  },
  userExistInfo: {
    code: '10003',
    message: '用户已经存在',
  },
  createUserFailInfo: {
    code: '10004',
    message: '创建用户失败',
  },
  authenticationErrorInfo: {
    code: '10005',
    message: {
      status: 401,
      errInfo:
        'Authentication Error, use the correct Authorization header to get access.',
    },
  },
}

// 类别
const categoryInfo = {
  categoryExistInfo: {
    code: '11001',
    message: '类别名称不能相同~',
  },
  categoryExistInfo2: {
    code: '11002',
    message: '类别不存在~',
  },
}

// 上传信息
const uploadInfo = {
  fileSizeExceedInfo: {
    code: '12001',
    message: '文件大小超过200M',
  },
  uploadFailInfo: {
    code: '12002',
    message: '上传失败',
  },
  uploadSuccessInfo: {
    code: '12003',
    message: '上传成功',
  },
}

// 操作文件
const fileInfo = {
  fileRequestFailInfo: {
    code: '13001',
    message: '文件请求失败',
  },
  noExistFileInfo: {
    code: '13002',
    message: '该文件不存在',
  },
  deleteFileSucceedInfo: {
    code: '13003',
    message: '文件删除成功',
  },
  deleteFileFailInfo: {
    code: '13004',
    message: '文件删除失败',
  },
  updateFileSuccessInfo: {
    code: '13005',
    message: '文件修改成功',
  },
  updateFileFailInfo: {
    code: '13006',
    message: '文件修改失败',
  },
  updateFileFailInfo1: {
    code: '13007',
    message: '文件名不能为空',
  },
}

const public = {
  deleteCuccessInfo: {
    code: '14001',
    message: '删除成功',
  },
  deleteFailInfo: {
    code: '14002',
    message: '删除失败',
  },
}

module.exports = {
  ...userInfo,
  ...categoryInfo,
  ...uploadInfo,
  ...fileInfo,
  ...public,
}
