import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enquiryService from './enquiryService';

export const getEnquiries = createAsyncThunk('enquiry/get-enquiries', async (thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSucess: false,
    message: '',
};

export const enquirySlice = createSlice({
    name: 'enquiries',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSucess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSucess = false;
                state.message = action.error;
            });
    },
});

export default enquirySlice.reducer;
