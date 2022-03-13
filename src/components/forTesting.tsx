import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useAppDispatch, useAppSelector } from '../hooks/common';
import { getUsers } from '../redux/actions/user.action';

export const Simple: FC = () => {
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const { isLoading, users } = useAppSelector(state => state.user);

    useEffect(() => {
        // if (!users) {
        //     dispatch(getUsers());
        // }
    }, []);
    
    return (
        <View testID="users/list">

        </View>
    );
}
