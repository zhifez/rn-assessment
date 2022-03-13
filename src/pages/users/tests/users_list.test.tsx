import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import UsersList from '../outlet/users_list';
import mockApi from '../../../common/mockApi';
import { store } from '../../../redux/store';
import { resetUserState } from '../../../redux/reducers/user.reducer';

describe('Users List', () => {
    beforeAll(() => {
        mockApi();
        store.dispatch(resetUserState());
    });

    afterEach(cleanup);

    test('Should render all users', () => {
        const rendered = render(<UsersList />);
        const userCards = rendered.getAllByTestId('userCard');
        expect(userCards.length).toBe(0);
    });
});