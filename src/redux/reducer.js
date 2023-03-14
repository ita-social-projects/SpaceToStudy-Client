import { createSlice } from '@reduxjs/toolkit'
import { parseJwt } from '~/utils/helper-functions'
import { createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import { AuthService } from '~/services/auth-service'
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '~/services/local-storage-service'
import { accessToken } from '~/constants'

const initialState = {
  userId: '',
  userRole: 'admin',
  userEmail: '',
  loading: false,
  authLoading: false,
  error: '',
  isFirstLogin: true
}

export const loginUser = createAsyncThunk('appMain/loginUser', async (userData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await AuthService.login(userData)
    setToLocalStorage(accessToken, data.accessToken)
    dispatch(setUser(data.accessToken))
  } catch (e) {
    return rejectWithValue(e.response.data.code)
  }
})

export const googleAuth = createAsyncThunk('appMain/loginUser', async (userData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await AuthService.googleAuth(userData)
    setToLocalStorage(accessToken, data.accessToken)
    dispatch(setUser(data.accessToken))
  } catch (e) {
    return rejectWithValue(e.response.data.code)
  }
})

export const signupUser = createAsyncThunk('appMain/signupUser', async (userData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await AuthService.signup(userData)
    dispatch(setUserEmail(data.userEmail))
  } catch (e) {
    return rejectWithValue(e.response.data.code)
  }
})

export const logoutUser = createAsyncThunk('appMain/logoutUser', async (_, { rejectWithValue, dispatch }) => {
  try {
    await AuthService.logout()
    removeFromLocalStorage(accessToken)
    dispatch(logout())
  } catch (e) {
    return rejectWithValue(e.response.data.code)
  }
})

export const checkAuth = createAsyncThunk('appMain/checkAuth', async (_, { rejectWithValue, dispatch }) => {
  try {
    if (getFromLocalStorage(accessToken)) {
      const { data } = await AuthService.refresh()
      setToLocalStorage(accessToken, data.accessToken)
      dispatch(setUser(data.accessToken))
    }
  } catch (e) {
    return rejectWithValue(e.response.data.code)
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
      state.isFirstLogin = userData.isFirstLogin
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload
    },
    logout(state) {
      state.userId = initialState.userId
      state.userRole = initialState.userRole
      state.userEmail = initialState.userEmail
      state.isFirstLogin = initialState.isFirstLogin
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
      const isAuthLoadingType = action.type === loginUser.pending.type || action.type === signupUser.pending.type
      const isLoadingType = action.type === checkAuth.pending.type || action.type === logoutUser.pending.type

      if (isAuthLoadingType) state.authLoading = true
      if (isLoadingType) state.loading = true
      state.error = ''
    })
    builder.addMatcher(isFulfilled, (state, action) => {
      const isAuthLoadingType = action.type === loginUser.fulfilled.type || action.type === signupUser.fulfilled.type
      const isLoadingType = action.type === checkAuth.fulfilled.type || action.type === logoutUser.fulfilled.type

      if (isAuthLoadingType) state.authLoading = false
      if (isLoadingType) state.loading = false
      state.error = ''
    })
    builder.addMatcher(isRejected, (state, action) => {
      const isAuthLoadingType = action.type === loginUser.rejected.type || action.type === signupUser.rejected.type
      const isLoadingType = action.type === checkAuth.rejected.type || action.type === logoutUser.rejected.type

      if (isAuthLoadingType) state.authLoading = false
      if (isLoadingType) state.loading = false
      state.error = action.payload
    })
  }
})

const { actions, reducer } = mainSlice

export const { setUser, setUserEmail, logout } = actions

export default reducer
