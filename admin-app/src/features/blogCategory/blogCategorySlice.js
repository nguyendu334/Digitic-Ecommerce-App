import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogCategoryService from './blogCategoryService';

export const getBlogCategory = createAsyncThunk('blogCategory/get-categories', async (thunkAPI) => {
    try {
        return await blogCategoryService.getBlogCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSucess: false,
    message: '',
};

export const blogCategorySlice = createSlice({
    name: 'blogCategory',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.categories = action.payload;
            })
            .addCase(getBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            });
    },
});

export default blogCategorySlice.reducer;
