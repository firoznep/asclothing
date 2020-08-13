import {
  ADD_ITEM,
  RESET_STATE,
} from '../../actionTypeConstant/StockActionTypeConst';

const INITIAL_STATE = [];

const StockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default StockReducer;
