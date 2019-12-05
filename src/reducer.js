import { combineReducers } from 'redux';
import leflairReducer from './reducers/leflairReducer';
import leflairByIdReducer from './reducers/leflairByIdReducer';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';

export default combineReducers({
    leflairReducer,
    leflairByIdReducer,
    cartReducer,
    userReducer
});