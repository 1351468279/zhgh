// 个人&部门类型选择
export type selectCatagoryType = {
  id: number;
  text: string;
};

// 获取会费缴纳列表接口参数类型
export type unionFeeListParamsType = {
  limit: string;
  offset: string;
  offset: string;
  sidx: string;
  sord: string;
};
//  会费缴纳列表接口返回参数类型
export type unionFeeListResultType = {
  flag: string;
  total: string;
  rows: string;
  id: string;
  orgId: string;
  orgName: string;
  title: string;
  cost: string;
  cycle: string;
  beginDate: string;
  endDate: string;
  remark: string;
  deleteFlag: string;
};
//  会费缴纳列表接口返回参数类型
export type unionFeeListResultData = {
  flag: boolean;
  total: string;
  row: unionFeeListResultType[];
};
// 获取个人会费缴纳列表接口参数类型
export type unionPersonFeeListParamsType = {
  limit: string;
  offset: string;
  userName: string;
  title: string;
  isPay: string;
  payState: string;
  standardId: string;
  sidx: string;
  sord: string;
};
// 个人会费缴纳列表接口返回参数类型
export type unionPersonFeeListResultType = {
  flag: string;
  total: string;
  rows: string;
  id: string;
  standardId: string;
  orgId: string;
  orgName: string;
  userId: string;
  userName: string;
  payable: string;
  actualPayment: string;
  isPay: string;
  payState: string;
  beginDate: string;
  endDate: string;
  desc: string;
  notice: string;
  createUser: string;
  createDate: string;
  deleteFlag: string;
  title: string;
  months: string;
  times: string;
  cycle: string;
  paymentMethod: string;
  remark: string;
};
export type unionPersonFeeListResultData = {
  flag: boolean;
  total: string;
  row: unionPersonFeeListResultType[];
};
