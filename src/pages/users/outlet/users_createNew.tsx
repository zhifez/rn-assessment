import React, { FC } from 'react';
import { VStack } from 'native-base';
import AppBar from '../../../components/appBar';
import BackButton from '../../../components/backButton';

const UsersCreateNew: FC = () => {
    return (
        <VStack 
            px={4}
            py={10}
            w="full"
            space={2}
            alignItems="center"
        >
            <AppBar 
                title="Create New User"
                leading={<BackButton />}
            />

        </VStack>
    );
}

export default UsersCreateNew;