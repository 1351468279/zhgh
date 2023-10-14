export type applyDiseaseHelper = {
  id?: string;
  userId?: string;
  unit?: string;
  name?: string;
  phone?: string;
  informationId?: string;
  uploadDate?: string;
  determine?: number;
  birthday?: string;
  process?:number;
};
export type getDiseaseHelperParamsType = {
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