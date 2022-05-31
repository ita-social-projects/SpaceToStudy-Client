import { createSlice } from '@reduxjs/toolkit'
import { parseJwt } from '~/utils/helper-functions'
import { loginUser } from './action-creators'

const initialState = {
  userId: '',
  userRole: '',
  loading: false,
  error: ''
}

export const mainSlice = createSlice({
  name: 'appMain',
  initialState,
  reducers: {
    setUser(state) {
      const tokken = localStorage.getItem('accessToken')

      if(tokken) {
        const userData = parseJwt(tokken)
        state.userId = userData.id
        state.userRole = userData.role
      }  
    },
    logout(state) {
      state.userId = ''
      state.userRole = ''
      localStorage.setItem('accessToken', '')
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true
      state.error = ''
    },
    [loginUser.fulfilled]: (state) => {
      state.loading = false
      state.error = ''
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
},
)
  
export const { setUser, logout } = mainSlice.actions
  
export default mainSlice.reducer
