import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogCategoryService from './blogCategoryService';

export const getBlogCategory = createAsyncThunk('blogCategory/get-categories', async (thunkAPI) => {
    try {
        return await blogCategoryService.getBlogCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogCategories = createAsyncThunk(
    'blogCategory/create-category',
    async (categoryData, thunkAPI) => {
        try {
            return await blogCategoryService.createBlogCategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const resetState = createAction('reset-all');

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
            })
            .addCase(createBlogCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.createBlogCategory = action.payload;
            })
            .addCase(createBlogCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default blogCategorySlice.reducer;
