import React, { FC, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { NativeRouter, useLocation, useNavigate, useRoutes } from 'react-router-native';
import { getUserRoutes } from './src/pages/users/users';
import { store } from './src/redux/store';
import { BackHandler } from 'react-native';

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


const AppWrapper = () => (
    <NativeBaseProvider>
        <Provider store={store}>
            <NativeRouter>
                <App />    
            </NativeRouter>    
        </Provider>
    </NativeBaseProvider>
)

export default AppWrapper;