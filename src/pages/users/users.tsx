import React, { FC } from 'react';
import { ScrollView } from 'native-base';
import { Outlet } from 'react-router-native';
import UsersCreateNew from './outlet/users_createNew';
import UsersList from './outlet/users_list';

const UsersPage: FC = () => {
    return (
        <ScrollView
            p="16px"
        >
            <Outlet />
        </ScrollView>
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
                path: '/newUser',
                element: <UsersCreateNew />,
            },
        ],
    },
];