import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import endpoints from '../../common/endpoints';
import { mockUsers, mockSingleUserData } from './testData';
import { store } from '../store';
import { getUsers } from '../actions/user.action';
import { addUser, resetUserState } from '../reducers/user.reducer';

const mockApi = () => {
    const mock = new MockAdapter(axios);
    mock.onGet(endpoints.getUsers).reply(200, mockUsers);
}

describe('User State', () => {
    beforeAll(() => {
        mockApi();
    });

    beforeEach(() => {
        store.dispatch(resetUserState());
    });

    test('Should receive users list on dispatching getUsers', async () => {
        await store.dispatch(getUsers());
        const userState = store.getState().user;
        expect(userState.users).toEqual(mockUsers);
    });

    test('Should add one user to an empty/undefined list', () => {
        let userState = store.getState().user;
        expect(userState.users).toBeUndefined();

        store.dispatch(addUser(mockSingleUserData));
        userState = store.getState().user;
        expect(userState.users?.length).toBe(1);
    });

    test('Should add one user to a defined list', async () => {
        await store.dispatch(getUsers());
        let userState = store.getState().user;
        expect(userState.users).toBeDefined();

        store.dispatch(addUser(mockSingleUserData));
        userState = store.getState().user;
        expect(userState.users?.length).toBe(mockUsers.length + 1);
    });
});