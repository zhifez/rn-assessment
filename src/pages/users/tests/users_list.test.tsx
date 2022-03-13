import React, { FC } from 'react';
import { render, cleanup, RenderAPI } from '@testing-library/react-native';
import mockApi from '../../../common/mockApi';
import { mockUsers } from '../../../redux/tests/testData';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import UsersList from '../outlet/users_list';
import { store } from '../../../redux/store';
import { NativeRouter } from 'react-router-native';

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
        const inset = {
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
        };

        rendered = render(
            <NativeBaseProvider initialWindowMetrics={inset}>
                <Provider store={store}>
                    <NativeRouter>
                        <UsersList />
                    </NativeRouter>
                </Provider>
            </NativeBaseProvider>
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