import React, { FC } from 'react';
import { Box, ScrollView } from 'native-base';
import { Outlet } from 'react-router-native';
import UsersCreateNew from './outlet/users_createNew';
import UsersList from './outlet/users_list';
import UsersPreview from './outlet/users_preview';
import Toast from 'react-native-toast-message';

const UsersPage: FC = () => {
    return (
        <Box
            safeArea
            h="full"
        >
            <ScrollView
                h="full"
            >
                <Outlet />
            </ScrollView>
            <Toast />
        </Box>
    );
}

export default UsersPage;

export const getUserRoutes = () => [
    {
        path: '/',
        element: <UsersPage />,
        children: [
            {
                path: '',
                element: <UsersList />,
            },
            {
                path: 'user/:id',
                element: <UsersPreview />,
            },
            {
                path: 'new',
                element: <UsersCreateNew />,
            },
        ],
    },
];