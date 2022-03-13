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

    test('Should receive users list', async () => {
        await store.dispatch(getUsers());
        const userState = store.getState().user;
        expect(userState.users).toEqual(mockUsers);
    });

    test('Should add one more user to users list', () => {
        // store.dispatch(addUser(mockSingleUserData));
        const userState = store.getState().user;
        console.log(userState.users);
        expect(userState.users).toBeUndefined();
    });
});