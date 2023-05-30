import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const getUserFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

// const userDefaultState = {
//     _id: null,
//     firstname: null,
//     lastname: null,
//     email: null,
//     mobile: null,
//     token: null,
// };

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSucess: false,
    message: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk(
    'order/get-orders',
    async (thunkAPI) => {
        try {
            return await authService.getOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const getOrderByUser = createAsyncThunk(
    'order/get-order',
    async (id, thunkAPI) => {
        try {
            return await authService.getOrder(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.user = null;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.orders = action.payload;
                state.message = 'Success';
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            })
            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.orderbyuser = action.payload;
                state.message = 'Success';
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            });
    },
});

export default authSlice.reducer;
