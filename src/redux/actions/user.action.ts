import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IUserData } from '../../interfaces/data';

export const getUsers = createAsyncThunk<
    IUserData[],
    void,
    { rejectValue: any; }
>('user/getUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (err: any) {
        let error: AxiosError<any> = err;
        if (!error.response) {
            throw err;
        }
        return rejectWithValue(error.response.data);
    }
});