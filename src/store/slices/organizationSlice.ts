import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'
import { createOrganizationService, deleteOrganizationService, getOrganizationListService, updateOrganizationService, getOrganizationDetailService } from '@/services/organizationService';

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

export const getOrganizationDetail = createAsyncThunk<any, any>(
  ActionTypes.ORGANIZATIONS.CREATE_ORGANIZATION,
  async (data, thunkAPI) => {
    try {
      const response = await getOrganizationDetailService(data);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
) // createOrganization

export const createOrganization = createAsyncThunk<any, any>(
  ActionTypes.ORGANIZATIONS.CREATE_ORGANIZATION,
  async (data, thunkAPI) => {
    try {
      const response = await createOrganizationService(data);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
) // createOrganization

export const updateOrganization = createAsyncThunk<any, any>(
  ActionTypes.ORGANIZATIONS.UPDATE_ORGANIZATION,
  async (data, thunkAPI) => {
    try {
      const response = await updateOrganizationService(data);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
) // updateOrganization
