import { combineReducers } from 'redux'
import AuthReducer from './auth-reducer'
//insert another reducers here to be combined

const reducers = combineReducers({
  Auth: AuthReducer
})

export default reducers
