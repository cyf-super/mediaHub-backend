import { WebsiteInfo } from './../routes/setting';
import { SwiperType } from '../controller/setting';
import Setting from '../db/model/Setting';

interface SwiperParams {}

/**
 * 上传轮播图
 * @param {*} swiper 轮播图信息列表
 */
export async function swpierUploadService(swiper: SwiperType[]) {
  const res = await Setting.findAndCountAll();
  if (res.count) {
    await Setting.update(
      {
        swiper
      },
      { where: {} }
    );
  } else {
    await Setting.create({
      swiper,
      websiteName: '',
      logo: ''
    });
  }
}
/**
 * 获取轮播图
 * @returns
 */
export async function getSwiperService() {
  const res = await Setting.findAndCountAll({
    attributes: ['swiper']
  });

  return res.rows?.map(row => row.dataValues.swiper)[0] || [];
}

/**
 * 获取网站信息
 * @returns
 */
export async function getWebsiteInfoService() {
  const res = await Setting.findAndCountAll({
    attributes: ['websiteName', 'logo']
  });

  return res.rows?.map(row => row.dataValues)[0] || {};
}

export async function updateWebsiteService(info: WebsiteInfo) {
  const res = await Setting.findAndCountAll();
  if (res.count) {
    await Setting.update(
      {
        ...info
      },
      { where: {} }
    );
  } else {
    await Setting.create({
      ...info,
      swiper: '[]'
    });
  }
}
