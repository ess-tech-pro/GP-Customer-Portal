import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NameSlices } from '../constants/nameSlices';
import { ActionTypes } from '../constants/actionTypes';
import { CreateUserRequest, CreateUserResponse } from '@/schemas';
import {
  fetchDetailUser as fetchDetailUserService,
  fetchListUser as fetchListUserService,
  createUser as createUserService,
  updateUser as updateUserService
} from '@/services/userService';

export const fetchListUser = createAsyncThunk<any, any>(
  ActionTypes.USERS.LIST_USER,
  async (filters, thunkAPI) => {
    try {
      const response = await fetchListUserService(filters);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

export const fetchDetailUser = createAsyncThunk<any, any>(
  ActionTypes.USERS.LIST_USER,
  async ({ id }, thunkAPI) => {
    try {
      const response = await fetchDetailUserService({ id });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

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

export const updateUser = createAsyncThunk<CreateUserResponse, CreateUserRequest & { userId: string }>(
  ActionTypes.USERS.UPDATE_USER, // A new action type for updating a user
  async ({ userId, username, role, status }, thunkAPI) => {
    try {
      const response = await updateUserService({ userId, username, role, status });

      return response; // This would be the updated user data
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

const createUserReducer = createSlice({
  name: NameSlices.CREATE_USER,
  initialState: {
    id: 0,
    username: '',
    role: '',
    status: false,
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
