import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import endpoints from './endpoints';
import { mockUsers } from '../redux/tests/testData';

const mockApi = () => {
    const mock = new MockAdapter(axios);
    mock.onGet(endpoints.getUsers).reply(200, mockUsers);
}

export default mockApi;