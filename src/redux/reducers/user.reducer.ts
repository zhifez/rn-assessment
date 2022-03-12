import { createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { IUserData } from '../../interfaces/data';
import { getUsers } from '../actions/user.action';

interface IUserState {
    isLoading: boolean;
    users?: IUserData[];
}

const initialState: IUserState = {
    isLoading: false,
}

const handlePending = (state: IUserState) => {
    state.isLoading = true;
}

const handleRejected = (state: IUserState, action: any) => {
    state.isLoading = false;
    Alert.alert(
        'Error',
        action.payload,
    );
}

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: {
            payload: IUserData;
        }) => {
            state.users = [
                action.payload,
                ...(state.users ?? []),
            ];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, handlePending);
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(getUsers.rejected, handleRejected);
    },
});

export const { addUser } = userState.actions;
export default userState.reducer;