import React, { FC } from 'react';
import { render, cleanup, RenderAPI } from '@testing-library/react-native';
import mockApi from '../../../common/mockApi';
import { mockUsers } from '../../../redux/tests/testData';
import { store } from '../../../redux/store';
import AppWrapper from '../../../../App';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView: FC<{}> = ({ children }): any => children;
    return { KeyboardAwareScrollView };
});
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Users List', () => {
    beforeAll(() => {
        mockApi();
    });

    let rendered: RenderAPI;
    beforeEach(() => {
        rendered = render(
            <AppWrapper 
                storeProp={store} 
                testOptions={{
                    initialRoutes: ['/'],
                }} 
            />
        );
    });

    afterEach(cleanup);

    test('Should render loaded users on mounted', async () => {
        // getUsers will be called on component mounted
        const mainComponent = await rendered.findByTestId('users/list');
        expect(mainComponent).toBeTruthy();

        const userCards = rendered.getAllByTestId('users/listItem');
        expect(userCards.length).toBe(mockUsers.length);
    });
});