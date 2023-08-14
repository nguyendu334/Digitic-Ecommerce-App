import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { authService } from './userService';

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await authService.register(userData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await authService.login(userData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserProductWishlist = createAsyncThunk('user/wishlist', async (thunkAPI) => {
    try {
        const response = await authService.getUserWishlist();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addProdToCart = createAsyncThunk('user/cart/add', async (cartData, thunkAPI) => {
    try {
        const response = await authService.addToCart(cartData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserCart = createAsyncThunk('user/cart/get', async (thunkAPI) => {
    try {
        const response = await authService.getCart();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const removeProdFromCart = createAsyncThunk('user/cart/delete', async (id, thunkAPI) => {
    try {
        const response = await authService.removeProductFromCart(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProdFromCart = createAsyncThunk('user/cart/update', async (cartDetail, thunkAPI) => {
    try {
        const response = await authService.updateProductFromCart(cartDetail);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const getCustomerFromLocalStorage = localStorage.getItem('customer')
    ? JSON.parse(localStorage.getItem('customer'))
    : null;

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const resetState = createAction('reset-all');

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success('User registered successfully');
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('User registration failed');
                }
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    localStorage.setItem('token', JSON.stringify(action.payload.token));
                    toast.success('Loged In successfully');
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Loged In failed');
                }
            })
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addProdToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProdToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success('Product added to cart successfully');
                }
            })
            .addCase(addProdToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(removeProdFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeProdFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deleteCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success('Product removed from cart successfully');
                }
            })
            .addCase(removeProdFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error('Product removal from cart failed');
                }
            })
            .addCase(updateProdFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProdFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success('Product updated from cart successfully');
                }
            })
            .addCase(updateProdFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error('Product update from cart failed');
                }
            })
            .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;
