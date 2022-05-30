import { createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '~/services/user-service'
import { setUser } from './reducer'


export const loginUser = createAsyncThunk(
  'appMain/loginUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try{
      const { data } = await userService.login(userData)
      localStorage.setItem('accessToken', data)
      dispatch(setUser())

    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)
