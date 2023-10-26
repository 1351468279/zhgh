export type listData = {
  id: number;
  userId: string;
  organization: string;
  title: number;
  author: string;
  source: string;
  blurb: string;
  details: string;
  Topping: number;
  stateId: string;
  number: number;
  release_time: string;
  update_time: string;
  process: number;
};

export type getDifficultyNewsListType = {
  rows: cardListItemType[];
  total: number;
};
export type getDifficultyHelperParamsType = {
  dbylAndKnbf: {
    fs: number;
    determine: number;
  };
  pageVo: {
    limit: number;
    offset: number;
    sidx: string;
    sord: string;
  };
};
export type imageItem = {
  fileName: string;
  id: string;
  originalName: string;
  path: string;
  type: string;
  uploadDate: string;
  userId: string;
};
export type newsItem = {
  author: string;
  blurb: string;
  id: string;
  details: string;
  knbfNewsImgList: imageItem[];
  organization: string;
  releaseTime: string;
  source: string;
  stateId: string;
  title: string;
  topping: number;
  userId: string;
};
export type nesItemRes = {
  flag: string;
  rows: newsItem[];
  total: number;
};
