export type applyRecuperationDataType = {
  id?: string;
  title: string;
  organization: number;
  slt?:string;
  address: string;
  hotline:string;
  content: string;
  startTime:string;
  endTime:string;
  participantsNumber: number;
};
export type applyRecuperationResDataType = {
  body:applyRecuperationDataType
  flag:boolean
};
