import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NameSlices } from '../constants/nameSlices';
import { ActionTypes } from '../constants/actionTypes';
import { userInformation as userInforService } from '../../services/userService';
import { UserResponse } from '../../schemas';


export const userInfo = createAsyncThunk(
    ActionTypes.USERS.INFOR_USER,
    async () => {
        try {
            const response = await userInforService();
            return response
        } catch (error: unknown) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'An unknown error occurred';
        }
    },
)

const userReducer = createSlice({
    name: NameSlices.USER,
    initialState: {
        user: null as UserResponse | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userInfo.fulfilled, (state, action) => {
            state.user = action.payload as UserResponse
        });
    },
});

export default userReducer.reducer;