import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ActionTypes } from '../constants/actionTypes';
import { NameSlices } from '../constants/nameSlices';
import { getOptionsRegisterGameService } from '@/services/optionsService';

export const getOptionsRegisterGame = createAsyncThunk<any>(
    ActionTypes.OPTIONS.REGISTER_GAME,
    async (_, thunkAPI) => {
        try {
            const response = await getOptionsRegisterGameService();
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
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getOptionsRegisterGame.fulfilled, (state, action) => {
            state.optionsRegisterGame = action.payload.data;
        });
    },
});

// export const { } = optionsSlice.actions;
export default optionsSlice.reducer;
