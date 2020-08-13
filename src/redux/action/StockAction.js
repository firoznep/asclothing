import {ADD_ITEM} from '../actionTypeConstant/StockActionTypeConst';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});
