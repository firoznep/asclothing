import {combineReducers} from 'redux';
import StockReducer from './reducer/stockReducer/StockReducer';

export default combineReducers({
  stock: StockReducer,
});
