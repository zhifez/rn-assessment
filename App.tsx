import React, { FC } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { NativeRouter, useRoutes } from 'react-router-native';
import { getUserRoutes } from './src/pages/users/users';
import { store } from './src/redux/store';

const App: FC = () => {
    const routing = useRoutes([
        ...getUserRoutes(),
    ]);

    return routing;
}


const AppWrapper = () => {
    <NativeBaseProvider>
        <Provider store={store}>
            <NativeRouter>
                <App />    
            </NativeRouter>    
        </Provider>
    </NativeBaseProvider>
}

export default AppWrapper;