import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';

export const getColors = createAsyncThunk('color/get-colors', async (thunkAPI) => {
    try {
        return await colorService.getColors();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createColors = createAsyncThunk('color/create-colors', async (colorData, thunkAPI) => {
    try {
        return await colorService.createColors(colorData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction('reset-all');

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSucess: false,
    message: '',
};

export const colorSlice = createSlice({
    name: 'colors',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            })
            .addCase(createColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.createColor = action.payload;
            })
            .addCase(createColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default colorSlice.reducer;
