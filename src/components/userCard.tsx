import { Box, HStack, Text, VStack } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { IUserData } from '../interfaces/data';

interface IUserCard {
    data: IUserData;
    onSelect: () => void;
}

const UserCard: FC<IUserCard> = ({
    data,
    onSelect,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSelect}
        >
            <VStack 
                w="full"
                p={3}
                borderRadius={8}
                bgColor="blue.100"
            >
                <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize={16} fontWeight="bold">Username:</Text>
                    <Text fontSize={16}>@{data.username}</Text>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize={16} fontWeight="bold">Email:</Text>
                    <Text fontSize={16}>{data.email}</Text>
                </HStack>
            </VStack>
        </TouchableOpacity>
    );
}

export default UserCard;