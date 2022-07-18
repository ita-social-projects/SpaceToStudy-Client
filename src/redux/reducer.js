import { createSlice } from '@reduxjs/toolkit'
import { parseJwt } from '~/utils/helper-functions'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '~/services/auth-service'
import { removeFromLocalStorage, setToLocalStorage } from '~/services/local-storage-service'
import { accessToken } from '~/constants'

const initialState = {
  userId: '',
  userRole: '',
  userEmail: '',
  loading: false,
  error: ''
}

export const loginUser = createAsyncThunk('appMain/loginUser', async (userData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await AuthService.login(userData)
    setToLocalStorage(accessToken, data.accessToken)
    dispatch(setUser(data.accessToken))
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const signupUser = createAsyncThunk('appMain/signupUser', async (userData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await AuthService.signup(userData)
    dispatch(setUserEmail(data.userEmail))
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const logoutUser = createAsyncThunk('appMain/logoutUser', async (_, { rejectWithValue, dispatch }) => {
  try {
    await AuthService.logout()
    removeFromLocalStorage(accessToken)
    dispatch(logout())
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const checkAuth = createAsyncThunk('appMain/checkAuth', async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await AuthService.refresh()
    setToLocalStorage(accessToken, data.accessToken)
    dispatch(setUser(data.accessToken))
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const mainSlice = createSlice({
  name: 'appMain',
  initialState,
  reducers: {
    setUser(state, action) {
      const userData = parseJwt(action.payload)
      state.userId = userData.id
      state.userRole = userData.role
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload
    },
    logout(state) {
      state.userId = ''
      state.userRole = ''
      state.userEmail = ''
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
    },
    [signupUser.pending]: (state) => {
      state.loading = true
      state.error = ''
    },
    [signupUser.fulfilled]: (state) => {
      state.loading = false
      state.error = ''
    },
    [signupUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [logoutUser.pending]: (state) => {
      state.loading = true
      state.error = ''
    },
    [logoutUser.fulfilled]: (state) => {
      state.loading = false
      state.error = ''
    },
    [logoutUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [checkAuth.pending]: (state) => {
      state.loading = true
      state.error = ''
    },
    [checkAuth.fulfilled]: (state) => {
      state.loading = false
      state.error = ''
    },
    [checkAuth.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

const { actions, reducer } = mainSlice

export const { setUser, setUserEmail, logout } = actions

export default reducer
