import React from 'react';
import { render, cleanup, RenderAPI } from '@testing-library/react-native';
import mockApi from '../../../common/mockApi';
import { store } from '../../../redux/store';
import { resetUserState } from '../../../redux/reducers/user.reducer';
import AppWrapper from '../../../../App';
import { getUsers } from '../../../redux/actions/user.action';
import { mockUsers } from '../../../redux/tests/testData';

describe('Users List', () => {
    beforeAll(() => {
        mockApi();
    });

    beforeEach(() => {
        store.dispatch(resetUserState());
    });

    afterEach(cleanup);

    test('Should render no user', async () => {
        const rendered = render(<AppWrapper />);
        const userCards = rendered.queryAllByTestId('userCard');
        expect(userCards.length).toBe(0);
    });

    test('Shoule render user cards', async () => {
        const rendered = render(<AppWrapper />);
        await store.dispatch(getUsers());
        const userCards = rendered.queryAllByTestId('userCard');
        expect(userCards.length).toBe(mockUsers.length);
    });
});