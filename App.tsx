import React, { FC, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { NativeRouter, useLocation, useNavigate, useRoutes } from 'react-router-native';
import { getUserRoutes } from './src/pages/users/users';
import { store } from './src/redux/store';
import { BackHandler } from 'react-native';
import { AnyAction, Store } from '@reduxjs/toolkit';

const App: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {     
        // Setup back button function (go to previous page)   
        BackHandler.addEventListener('hardwareBackPress', () => {
            // Go to dashboard only if pathname is home
            navigate(-1);
            return true;
        });
    }, [pathname]);
    
    const routing = useRoutes([
        ...getUserRoutes(),
    ]);

    return (
        <>{routing}</>
    );
}

interface IAppWrapper {
    storeProp?: Store<any, AnyAction>;
    testOptions?: {
        initialRoutes: string[];
    };
}

const AppWrapper: FC<IAppWrapper> = ({
    storeProp,
    testOptions,
}) => {
    const inset = {
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };

    return (
        <NativeBaseProvider initialWindowMetrics={!!testOptions ? inset : undefined}>
            <Provider store={storeProp ?? store}>
                <NativeRouter 
                    initialEntries={!!testOptions ? testOptions.initialRoutes : undefined}
                >
                    <App />    
                </NativeRouter>    
            </Provider>
        </NativeBaseProvider>
    );
}

export default AppWrapper;