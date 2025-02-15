// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import exampleReducer from './slices/exampleSlice'
import loginReducer from './slices/loginSlice'
import optionsReducer from './slices/optionsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
	reducer: {
		example: exampleReducer,
		login: loginReducer,
		user: userReducer,
		options: optionsReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
