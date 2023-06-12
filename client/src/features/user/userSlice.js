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

const initialState = {
    user: '',
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
            .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;
