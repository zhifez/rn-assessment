import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';

const reducers = combineReducers({
    user: userReducer,
});

export const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;