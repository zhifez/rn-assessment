import React, { FC, useEffect } from 'react';
import { Divider, Fab, Text, VStack } from 'native-base';
import { useAppDispatch, useAppSelector } from '../../../hooks/common';
import { getUsers } from '../../../redux/actions/user.action';
import UserCard from '../../../components/userCard';
import { useNavigate } from 'react-router-native';
import IoIcons from 'react-native-vector-icons/Ionicons';
import LoadingModal from '../../../components/loadingModal';

const UsersList: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, users } = useAppSelector(state => state.user);

    useEffect(() => {
        if (!users) {
            dispatch(getUsers());
        }
    }, []);

    const _selectUser = (id: any) => () => {
        navigate(`../user/${id}`);
    }

    const _createNewUser = () => {
        navigate('../new');
    }

    return (
        <VStack 
            p={4}
            space={3}
            pb={24}
        >
            <LoadingModal 
                isOpen={isLoading}
            />
            <Fab
                placement="bottom-right"
                colorScheme="blue"
                size="lg"
                icon={<IoIcons name="add" size={24} color="white" />}
                onPress={_createNewUser}
            />
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