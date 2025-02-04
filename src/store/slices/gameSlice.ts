import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'
import { getGameDetailService, getGameListService } from '@/services/gameService'

export const getGameDetail = createAsyncThunk<any, any>(
	ActionTypes.GAME.GAME_DETAIL,
	async ({ id }, thunkAPI) => {
		try {
			const response = await getGameDetailService({ id })

			return response
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message)
			}
			return thunkAPI.rejectWithValue('An unknown error occurred')
		}
	}
)

export const getGameList = createAsyncThunk<
	any,
	any
>(ActionTypes.GAME.GAME_LIST, async (filters, thunkAPI) => {
	try {
		const response = await getGameListService(filters);
		return response;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return thunkAPI.rejectWithValue(error.message);
		}
		return thunkAPI.rejectWithValue('An unknown error occurred');
	}
});
