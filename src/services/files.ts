import { FilesParams } from '../controller/files';
import { UpdateFiles } from '../routes/files';
import File from '../db/model/File';
import seq from 'sequelize';

const Op = seq.Op;

export async function getFilesServer({
  categoryId = 'all',
  name,
  pageSize,
  currentPage
}: FilesParams) {
  let options: any = {
    name: {
      [Op.like]: `%${name}%`
    }
  };
  if (categoryId !== 'all') {
    options.categoryId = categoryId;
  }

  try {
    const res = await File.findAndCountAll({
      where: options,
      offset: (+currentPage - 1) * +pageSize,
      limit: +pageSize
    });

    if (!res) return res;
    const data = {
      count: res.count,
      files: res.rows?.map(row => row.dataValues) || []
    };
    return data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * 获取单个文件
 * @param {*} fileId
 */
export async function getFileServer(fileId: number) {
  const res = await File.findOne({
    where: {
      fileId
    }
  });

  return res?.dataValues;
}

export async function deleteFilesServer(fileIds: number[]) {
  try {
    const res = await File.destroy({
      where: {
        fileId: fileIds
      }
    });

    return res;
  } catch (e) {
    return e;
  }
}

export async function updateFileServer({ fileId, name }: UpdateFiles) {
  try {
    const res = await File.update(
      {
        name
      },
      {
        where: {
          fileId
        }
      }
    );

    console.log(res, res.length);
    return res.length > 0;
  } catch (error) {
    console.log('error--> ', error);
    return 0;
  }
}
