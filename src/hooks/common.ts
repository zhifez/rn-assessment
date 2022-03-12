import { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, EmitterSubscription } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useKeyboardBottomInset = () => {
    const [bottom, setBottom] = useState(0);
    const subscriptions = useRef<EmitterSubscription[]>([]);
  
    useEffect(() => {
        subscriptions.current = [
            Keyboard.addListener('keyboardDidHide', (e) => setBottom(0)),
            Keyboard.addListener('keyboardDidShow', (e) => {
                if (Platform.OS === "android") {
                    setBottom(e.endCoordinates.height)
                } else {
                    setBottom(Math.max(e.startCoordinates!.height, e.endCoordinates.height))
                }
            }),
        ];
      
        return () => {
            subscriptions.current.forEach((subscription) => {
                subscription.remove();
            });
        }
    }, [setBottom, subscriptions]);
  
    return bottom;
};