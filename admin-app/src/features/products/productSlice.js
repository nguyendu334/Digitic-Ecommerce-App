import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

export const getProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSucess: false,
    message: '',
};

export const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            });
    },
});

export default productSlice.reducer;
