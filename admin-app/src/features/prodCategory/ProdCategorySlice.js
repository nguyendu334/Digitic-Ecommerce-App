import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productCategoryService from './ProdCategoryService';

export const getCategories = createAsyncThunk(
    'productCategory/get-categories',
    async (thunkAPI) => {
        try {
            return await productCategoryService.getProductCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const createProdCategories = createAsyncThunk(
    'productCategory/create-category',
    async (categoryData, thunkAPI) => {
        try {
            return await productCategoryService.createProdCategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSucess: false,
    message: '',
};

export const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            })
            .addCase(createProdCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProdCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.createProdCategory = action.payload;
            })
            .addCase(createProdCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            });
    },
});

export default productCategorySlice.reducer;
