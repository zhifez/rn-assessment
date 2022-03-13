import React, { FC } from 'react';
import { render, cleanup, RenderAPI, fireEvent, waitFor } from '@testing-library/react-native';
import mockApi from '../../../common/mockApi';
import { store } from '../../../redux/store';
import AppWrapper from '../../../../App';
import { IInputConfig } from '../outlet/users_createNew';
import { act } from 'react-test-renderer';
import { mockUsers } from '../../../redux/tests/testData';

interface ITestInputConfig extends IInputConfig {
    testValue: string;
}

const formInputs: ITestInputConfig[] = [
    {
        name: 'name',
        placeholder: 'Name',
        requiredMessage: 'Name is required',
        testValue: 'Helmut Zemo',
    },
    {
        name: 'username',
        placeholder: 'Username',
        requiredMessage: 'Username is required',
        testValue: 'evil_villain',
    },
    {
        name: 'email',
        placeholder: 'E.g. johndoe@example.com',
        invalidMessage: 'Email is invalid',
        requiredMessage: 'Email is required',
        testValue: 'helmut@zemo.com',
    },
    {
        name: 'phone',
        placeholder: 'E.g. 0123456789',
        invalidMessage: 'Phone number is invalid',
        requiredMessage: 'Phone number is required',
        keyboardType: 'phone-pad',
        testValue: '0123456789',
    },
    {
        name: 'website',
        placeholder: 'Your website (optional)',
        invalidMessage: 'Website is invalid',
        testValue: 'helmut.zemo.com',
    },
    {
        name: 'company',
        placeholder: 'Your company (optional)',
        testValue: 'Helmut Zemo Pte. Ltd.',
    },
    {
        name: 'address',
        placeholder: 'Street name',
        requiredMessage: 'Address is required',
        testValue: 'Siberia',
    },
    {
        name: 'suite',
        placeholder: 'Suite (optional)',
        testValue: 'Villain Suite',
    },
    {
        name: 'city',
        placeholder: 'City',
        requiredMessage: 'City is required',
        testValue: 'Antartica',
    },
    {
        name: 'zipcode',
        placeholder: 'Zipcode',
        requiredMessage: 'Zipcode is required',
        keyboardType: 'number-pad',
        testValue: '901203',
    },
];

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
                    initialRoutes: ['/', '/new'],
                }} 
            />
        );
    });

    afterEach(cleanup);

    test('Should contain an AppBar component', () => {
        const appBar = rendered.getByTestId('appBar');
        expect(appBar).toBeTruthy();
    });

    test('Should contain "Create New User" in AppBar title', () => {
        const appBarTitle = rendered.getByTestId('appBar/title');
        expect(appBarTitle).toBeTruthy();
        expect(appBarTitle.children[0]).toMatch('Create New User');
    });

    test('Should reroute to users list on press Back button', () => {
        const backButton = rendered.getByTestId('backButton');
        fireEvent.press(backButton);

        const currentPage = rendered.queryByTestId('users/createNew');
        expect(currentPage).toBeFalsy();

        const userListPage = rendered.queryByTestId('users/list');
        expect(userListPage).toBeTruthy();
    });

    test('Should render form inputs', () => {
        formInputs.forEach(input => {
            const component = rendered.getByTestId(`input/${input.name}`);
            expect(component).toBeTruthy();

            if (!!input.placeholder) {
                const placeholderComp = rendered.queryByPlaceholderText(input.placeholder);
                expect(placeholderComp).toBeTruthy();
            }
        });
    });

    test('Should display error when no inputs are provided and submit button is pressed', async () => {
        const submitButton = rendered.getByTestId('submitButton');
        await waitFor(() => {
            fireEvent.press(submitButton);
        });

        formInputs.forEach(input => {
            const errorComponent = rendered.queryByTestId(`input-error/${input.name}`);

            if (!!input.requiredMessage) {
                expect(errorComponent).toBeTruthy();
                expect(errorComponent?.children[0]).toMatch(input.requiredMessage);
            }
        });
    });

    test('Should diplay error when email input is invalid', async () => {
        const emailInputConfig = formInputs.filter(input => input.name === 'email')[0];

        const component = rendered.getByTestId(`input/email`);
        await waitFor(() => {
            fireEvent.changeText(component, 'asd');
        });

        const errorComponent = rendered.queryByTestId(`input-error/email`);
        expect(errorComponent).toBeTruthy();
        expect(errorComponent!.children[0]).toMatch(emailInputConfig.invalidMessage!);
    });

    test('Should diplay error when phone input is invalid', async () => {
        const phoneInputConfig = formInputs.filter(input => input.name === 'phone')[0];

        const component = rendered.getByTestId(`input/phone`);
        await waitFor(() => {
            fireEvent.changeText(component, '234');
        });

        const errorComponent = rendered.queryByTestId(`input-error/phone`);
        expect(errorComponent).toBeTruthy();
        expect(errorComponent!.children[0]).toMatch(phoneInputConfig.invalidMessage!);
    });

    // test('Should redirect users to user list when a new user is added, and the new user will be in the list', async () => {
    //     await waitFor(() => {
    //         formInputs.forEach(async input => {
    //             const component = rendered.getByTestId(`input/${input.name}`);
    //             await fireEvent.changeText(component, input.testValue);

    //             const errorComponent = rendered.queryByTestId(`input-error/${input.name}`);
    //             expect(errorComponent).toBeNull();
    //         });
    //     });

    //     await waitFor(async () => {
    //         const submitButton = rendered.getByTestId('submitButton');
    //         await fireEvent.press(submitButton);
    //     });
    //     // await waitFor(async () => {
    //     //     const submitButton = await rendered.getByTestId('submitButton');
    //     //     await fireEvent.press(submitButton);
    //     // });

    //     // const userListPage = await rendered.findByTestId('users/list');
    //     // console.log(userListPage);
    //     // expect(userListPage).toBeTruthy();

    //     // const userCards = rendered.getAllByTestId('users/listItem');
    //     // expect(userCards.length).toBe(mockUsers.length + 1);
    // });
});