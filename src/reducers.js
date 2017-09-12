/**
 * Created by john on 2017/6/6.
 */
import {combineReducers} from 'redux'
// import {reducer as app} from './actions/app'
import {reducers} from './actions'
//使用redux的combineReducers方法将所有reducer打包起来
const appReducer = combineReducers({
    ...reducers
});
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
};
export default rootReducer
