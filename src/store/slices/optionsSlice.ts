import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ActionTypes } from '../constants/actionTypes';
import { NameSlices } from '../constants/nameSlices';
import { getConfigsService } from '@/services/optionsService';

export const getConfigs = createAsyncThunk<any>(
    ActionTypes.OPTIONS.REGISTER_GAME,
    async (_, thunkAPI) => {
        try {
            const response = await getConfigsService();
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    },
);

const optionsSlice = createSlice({
    name: NameSlices.REGISTER_GAME,
    initialState: {
        optionsRegisterGame: {},
        optionsGameConfig: {}
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getConfigs.fulfilled, (state, action) => {
            state.optionsRegisterGame = action.payload.data.gameRegister;
            state.optionsGameConfig = action.payload.data.gameConfig;
        });
    },
});

// export const { } = optionsSlice.actions;
export default optionsSlice.reducer;
