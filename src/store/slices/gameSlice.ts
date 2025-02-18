import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'
import { approveRegisterGameService, deleteRegisterGameService, getGameDetailService, getGameListService, getOptionsService, getRegisterGameDetailService, getRegisterGameListService, registerGameService, rejectRegisterGameService, updateRegisterGameService } from '@/services/gameService'

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

export const getOptions = createAsyncThunk<any>(
	ActionTypes.GAME.GAME_DETAIL,
	async (_, thunkAPI) => {
		try {
			const response = await getOptionsService()

			return response
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message)
			}
			return thunkAPI.rejectWithValue('An unknown error occurred')
		}
	}
)

export const registerGame = createAsyncThunk<any, any>(
	ActionTypes.GAME.REGISTER_GAME,
	async (data, thunkAPI) => {
		try {
			const response = await registerGameService(data);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	},
);

export const getRegisterGameList = createAsyncThunk<any, any>(
	ActionTypes.GAME.REGISTER_GAME_LIST,
	async (data, thunkAPI) => {
		try {
			const response = await getRegisterGameListService(data);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	},
);

export const deleteRegisterGame = createAsyncThunk<any, any>(
	ActionTypes.GAME.REGISTER_GAME,
	async (id, thunkAPI) => {
		try {
			const response = await deleteRegisterGameService(id);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	},
);

export const getRegisterGameDetail = createAsyncThunk<any, any>(
	ActionTypes.GAME.REGISTER_GAME_DETAIL,
	async (id, thunkAPI) => {
		try {
			const response = await getRegisterGameDetailService(id);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	},
);

export const updateRegisterGame = createAsyncThunk<any, any>(
	ActionTypes.GAME.UPDATE_REGISTER_GAME,
	async ({ id, data }, thunkAPI) => {
		try {
			const response = await updateRegisterGameService(id, data);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	},
);

export const rejectRegisterGame = createAsyncThunk<any, any>(
	ActionTypes.GAME.REGISTER_GAME,
	async (id, thunkAPI) => {
		try {
			const response = await rejectRegisterGameService(id);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	},
);

export const approveRegisterGame = createAsyncThunk<any, any>(
	ActionTypes.GAME.REGISTER_GAME,
	async (id, thunkAPI) => {
		try {
			const response = await approveRegisterGameService(id);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('An unknown error occurred');
		}
	},
);

