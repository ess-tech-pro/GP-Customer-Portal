import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NameSlices } from '../constants/nameSlices';
import { ActionTypes } from '../constants/actionTypes';
import { CreateUserRequest, CreateUserResponse } from '@/schemas';
import { createUser as createUserService } from '@/services/userService';

export const createUser = createAsyncThunk<CreateUserResponse, CreateUserRequest>(
  ActionTypes.USERS.CREATE_USER,
  async ({ username, role, password, confirmPassword, status }, thunkAPI) => {
    try {
      const response = await createUserService({ username, role, password, confirmPassword, status });

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

const createUserReducer = createSlice({
  name: NameSlices.USER,
  initialState: {
    id: 0,
    username: '',
    role: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    error: '',
  } as CreateUserResponse,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.status = action.payload.status;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.error = '';
    });
  },
});

export default createUserReducer.reducer;
