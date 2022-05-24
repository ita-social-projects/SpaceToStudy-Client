import { combineReducers } from 'redux'
import User from '~/redux/user/user.reducer'

export const rootReducer = () =>
  combineReducers({
    User
  })
