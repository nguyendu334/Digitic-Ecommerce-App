import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import couponService from './couponService';

export const getCoupons = createAsyncThunk('coupon/get-coupons', async (thunkAPI) => {
    try {
        return await couponService.getCoupons();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCoupons = createAsyncThunk('coupon/create-coupons', async (couponData, thunkAPI) => {
    try {
        return await couponService.createCoupons(couponData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction('reset-all');

const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSucess: false,
    message: '',
};

export const couponSlice = createSlice({
    name: 'coupons',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.coupons = action.payload;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            })
            .addCase(createCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.createCoupon = action.payload;
            })
            .addCase(createCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default couponSlice.reducer;
