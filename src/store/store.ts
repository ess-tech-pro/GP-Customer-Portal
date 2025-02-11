import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './slices/exampleSlice'
import loginReducer from './slices/loginSlice'
import optionsReducer from './slices/optionsSlice'

export const store = configureStore({
	reducer: {
		example: exampleReducer,
		login: loginReducer,
		options: optionsReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
