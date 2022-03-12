import React, { FC, useEffect } from 'react';
import { Divider, Text, VStack } from 'native-base';
import { useAppDispatch, useAppSelector } from '../../../hooks/common';
import { getUsers } from '../../../redux/actions/user.action';
import UserCard from '../../../components/userCard';
import { useNavigate } from 'react-router-native';

const UsersList: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { users } = useAppSelector(state => state.user);

    useEffect(() => {
        if (!users) {
            dispatch(getUsers());
        }
    }, []);

    const _selectUser = (id: any) => () => {
        navigate(`/user/${id}`);
    }

    return (
        <VStack 
            p={4}
            space={3}
        >
            <Text 
                fontSize={20} 
                fontWeight="bold"
            >
                Users
            </Text>
            <Divider w="full" />
            {!!users && users.map((user, u) => 
            <UserCard 
                key={u}
                data={user}
                onSelect={_selectUser(user.id)}
            />)}
        </VStack>
    );
}

export default UsersList;