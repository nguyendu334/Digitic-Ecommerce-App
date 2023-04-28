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
            });
    },
});

export default authSlice.reducer;
