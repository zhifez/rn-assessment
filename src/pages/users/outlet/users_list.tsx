import React, { FC, useEffect } from 'react';
import { Divider, Fab, Text, VStack } from 'native-base';
import { useAppDispatch, useAppSelector } from '../../../hooks/common';
import { getUsers } from '../../../redux/actions/user.action';
import UserCard from '../../../components/userCard';
import { useNavigate } from 'react-router-native';
import IoIcons from 'react-native-vector-icons/Ionicons';
import LoadingModal from '../../../components/loadingModal';
import { View } from 'react-native';

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
        <>
            <LoadingModal 
                isOpen={isLoading}
            />
            <VStack 
                p={4}
                pb={24}
                space={3}
                testID="users/list"
            >
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
                <View
                    key={u}
                    testID="users/listItem"
                >
                    <UserCard 
                        data={user}
                        onSelect={_selectUser(user.id)}
                    />
                </View>)}
            </VStack>
        </>
    );
}

export default UsersList;