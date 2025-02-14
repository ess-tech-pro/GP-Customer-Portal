import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActionTypes } from "../constants/actionTypes";
import { fetchAppConfig as fetchAppConfigService } from "@/services/appConfigService";
import { AppConfigResponse } from "@/schemas";
import { NameSlices } from '../constants/nameSlices';

export const fetchAppConfig = createAsyncThunk<AppConfigResponse>(
  ActionTypes.APP_CONFIG.GET_CONFIGS,
  async (_, thunkAPI) => {
    try {
      const response = await fetchAppConfigService();
      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
)

const appConfigSlice = createSlice({
  name: NameSlices.APP_CONFIG,
  initialState: {
    data: [] as AppConfigResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppConfig.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  },
});

export default appConfigSlice.reducer;
