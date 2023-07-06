import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { parseJwt } from '~/utils/helper-functions'
import {
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected
} from '@reduxjs/toolkit'
import { AuthService } from '~/services/auth-service'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage
} from '~/services/local-storage-service'
import { accessToken } from '~/constants'
import { AxiosError } from 'axios'
import {
  AccessToken,
  ErrorResponse,
  GoogleAuthParams,
  LoginParams,
  SignupParams,
  UserRole
} from '~/types'

interface UserState {
  userId: string
  userRole: UserRole | ''
  authLoading: boolean
  error: string
  isFirstLogin: boolean
  loading: boolean
  pageLoad: boolean
}

const initialState: UserState = {
  userId: '',
  userRole: '',
  authLoading: false,
  loading: true,
  pageLoad: false,
  error: '',
  isFirstLogin: true
}

export const loginUser = createAsyncThunk(
  'appMain/loginUser',
  async (userData: LoginParams, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await AuthService.login(userData)
      setToLocalStorage(accessToken, data.accessToken)
      dispatch(setUser(data.accessToken))
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data.code)
    }
  }
)

export const googleAuth = createAsyncThunk(
  'appMain/googleAuth',
  async (userData: GoogleAuthParams, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await AuthService.googleAuth(userData)
      setToLocalStorage(accessToken, data.accessToken)
      dispatch(setUser(data.accessToken))
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data.code)
    }
  }
)

export const signupUser = createAsyncThunk(
  'appMain/signupUser',
  async (userData: SignupParams, { rejectWithValue }) => {
    try {
      await AuthService.signup(userData)
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data.code)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'appMain/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await AuthService.logout()
      removeFromLocalStorage(accessToken)
      dispatch(logout())
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data.code)
    }
  }
)

export const checkAuth = createAsyncThunk(
  'appMain/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      if (getFromLocalStorage(accessToken)) {
        const { data } = await AuthService.refresh()
        setToLocalStorage(accessToken, data.accessToken)
        dispatch(setUser(data.accessToken))
      }
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data.code)
    }
  }
)

export const setPageLoad = createAsyncThunk(
  'appMain/setPageLoad',
  (loading: boolean, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setPageLoading(loading))
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const mainSlice = createSlice({
  name: 'appMain',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      const userData: AccessToken = parseJwt(action.payload)
      state.userId = userData.id
      state.userRole = userData.role
      state.isFirstLogin = userData.isFirstLogin
    },
    logout(state) {
      state.userId = initialState.userId
      state.userRole = initialState.userRole
      state.isFirstLogin = initialState.isFirstLogin
    },
    markFirstLoginComplete(state) {
      state.isFirstLogin = false
    },
    setPageLoading(state, action: PayloadAction<boolean>) {
      console.log(action)
      state.pageLoad = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
      if (isAnyOf(checkAuth.pending, logoutUser.pending)(action)) {
        state.loading = true
      } else {
        state.authLoading = true
      }
      state.error = ''
    })
    builder.addMatcher(isFulfilled, (state, action) => {
      if (isAnyOf(checkAuth.fulfilled, logoutUser.fulfilled)(action)) {
        state.loading = false
      } else {
        state.authLoading = false
      }
      state.error = ''
    })
    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false
      state.authLoading = false
      if (typeof action.payload === 'string') {
        state.error = action.payload
      }
    })
  }
})

const { actions, reducer } = mainSlice

export const { setUser, logout, markFirstLoginComplete, setPageLoading } =
  actions

export default reducer
