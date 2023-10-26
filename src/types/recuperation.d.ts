export type applyRecuperationDataType = {
  id?: string;
  title: string;
  organization: number;
  slt?: string;
  address: string;
  hotline: string;
  content: string;
  startTime: string;
  endTime: string;
  participantsNumber: number;
};
export type applyRecuperationDataParams = {
  id?: string;
  title: string;
  organization: number;
  state?:number;
  imgList: {
    fileName: string;
    id: string;
    originalName: string;
    path: string;
    type: string;
    uploadDate: string;
    userId: string;
  }[];
  address: string;
  hotline: string;
  content: string;
  startTime: string;
  endTime: string;
  participantsNumber: number;
};
 
export type applyRecuperationResDataType = {
  body: applyRecuperationDataParams;
  isJoin:number;
  flag: boolean;
};
