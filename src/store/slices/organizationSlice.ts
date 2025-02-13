import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'
import { deleteOrganizationService, getOrganizationListService } from '@/services/organizationService';

export const getOrganizationList = createAsyncThunk<
  any,
  any
>(ActionTypes.ORGANIZATIONS.ORGANIZATION_LIST, async (filters, thunkAPI) => {
  try {
    const response = await getOrganizationListService(filters);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const deleteOrganization = createAsyncThunk<any, any>(
  ActionTypes.ORGANIZATIONS.DELETE_ORGANIZATION,
  async ({ id }, thunkAPI) => {
    try {
      const response = await deleteOrganizationService(id);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);
