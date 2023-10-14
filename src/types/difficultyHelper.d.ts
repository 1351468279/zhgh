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
// 新闻列表
export type cardListItemType = {
  id: string;
  image?: string;
  title?: string;
  releaseTime?: string;
  number?: number;
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
