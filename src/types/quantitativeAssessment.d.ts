export type selfParamsType = {
  self_assessmentParams: string;
};
export type myDataResItemsType = {
  id: string;
  messageId: string;
  messageTitle: string;
  memberUsername: string;
  memberUserId: string;
  orgName: string;
  orgId: string;
  evaluate: string;
  describe: string;
  self: number;
  createTime: string;
  createUsername: string;
  createUserId: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
};
export type myDataResType = myDataResItemsType[];
export interface evaluator {
  id: string;
  name: string;
  orgid: string;
}
export type getTogethorEvaluator = evaluator[];
export type getTogethorEvaluatorRes =  {
  userList:getTogethorEvaluator
  memberBean:myDataResItemsType
  flag:string
}
