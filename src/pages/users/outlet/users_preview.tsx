import React, { FC, useMemo, useState } from 'react';
import { Divider, HStack, Text, VStack } from 'native-base';
import { Navigate, useParams } from 'react-router-native';
import { useAppSelector } from '../../../hooks/common';
import { IUserData } from '../../../interfaces/data';
import CircleAvatar from '../../../components/circleAvatar';
import AppBar from '../../../components/appBar';
import BackButton from '../../../components/backButton';

const UsersPreview: FC = () => {
    const { id } = useParams();
    const { users } = useAppSelector(state => state.user);
    const [userImage, setUserImage] = useState<string>('https://i.pravatar.cc/300');

    const userById: IUserData | undefined = useMemo(() => {
        if (!!users && users.length > 0) {
            let findUser = users.filter(u => u.id.toString() === id);
            if (findUser.length > 0) {
                setUserImage(`https://i.pravatar.cc/30${id}`);
                return findUser[0];
            }
        }
        return undefined;
    }, [id, users]);

    if (!userById) {
        return <Navigate to="/" replace />
    }

    const formatFullAddress: string = useMemo(() => 
        `${userById.address.street}${!!userById.address.suite ? `, ${userById.address.suite}` : ''}\n` +
        `${userById.address.city}, ${userById.address.zipcode}`, 
        [userById]
    );

    return (
        <VStack 
            px={4}
            py={10}
            w="full"
            space={2}
            alignItems="center"
        >
            <AppBar 
                title={`@${userById.username}`}
                leading={<BackButton />}
            />

            <CircleAvatar 
                avatarUri={userImage}
            />
            <Text fontSize={20} fontWeight="bold">{userById.name}</Text>
            <Text fontSize={16} >{userById.email}</Text>

            <Divider 
                w="full"
                my={2}
            />

            <HStack
                w="full"
                justifyContent="space-between"
            >
                <Text fontSize={16} fontWeight="semibold">Address</Text>
                <Text fontSize={16}>{formatFullAddress}</Text>
            </HStack>

            <HStack
                w="full"
                justifyContent="space-between"
            >
                <Text fontSize={16} fontWeight="semibold">GEO</Text>
                <Text fontSize={16}>{userById.address.geo.lat}, {userById.address.geo.lng}</Text>
            </HStack>

            <HStack
                w="full"
                justifyContent="space-between"
            >
                <Text fontSize={16} fontWeight="semibold">Phone</Text>
                <Text fontSize={16}>{userById.phone}</Text>
            </HStack>

            <HStack
                w="full"
                justifyContent="space-between"
            >
                <Text fontSize={16} fontWeight="semibold">Website</Text>
                <Text fontSize={16}>{userById.website ?? '-'}</Text>
            </HStack>

            <HStack
                w="full"
                justifyContent="space-between"
            >
                <Text fontSize={16} fontWeight="semibold">Company</Text>
                <Text fontSize={16}>{!!userById.company ? userById.company.name : '-'}</Text>
            </HStack>
        </VStack>
    );
}

export default UsersPreview;