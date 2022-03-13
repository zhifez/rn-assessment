import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Divider, HStack, Input, Text, VStack } from 'native-base';
import AppBar from '../../../components/appBar';
import BackButton from '../../../components/backButton';
import { Formik, FormikProps } from 'formik';
import { IUserData } from '../../../interfaces/data';
import { useAppDispatch } from '../../../hooks/common';
import { addUser } from '../../../redux/reducers/user.reducer';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';
import CustomButton from '../../../components/customButton';
import CustomInput, { ErrorCode } from '../../../components/customInput';
import { KeyboardType, NavigatorIOS, PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Geolocation, { GeolocationOptions } from '@react-native-community/geolocation';
import IoIcons from 'react-native-vector-icons/Ionicons';
import LoadingModal from '../../../components/loadingModal';

interface IInputConfig {
    name: string;
    placeholder?: string;
    invalidMessage?: string;
    requiredMessage?: string;
    keyboardType?: KeyboardType;
}

const formInputs: IInputConfig[] = [
    {
        name: 'name',
        placeholder: 'Name',
        requiredMessage: 'Name is required',
    },
    {
        name: 'username',
        placeholder: 'Username',
        requiredMessage: 'Username is required',
    },
    {
        name: 'email',
        placeholder: 'E.g. johndoe@example.com',
        invalidMessage: 'Email is invalid',
        requiredMessage: 'Email is required',
    },
    {
        name: 'phone',
        placeholder: 'E.g. 0123456789',
        invalidMessage: 'Phone number is invalid',
        requiredMessage: 'Phone number is required',
        keyboardType: 'phone-pad',
    },
    {
        name: 'website',
        placeholder: 'Your website (optional)',
        invalidMessage: 'Website is invalid',
    },
    {
        name: 'company',
        placeholder: 'Your company (optional)',
    },
];

const formInputs_address: IInputConfig[] = [
    {
        name: 'address',
        placeholder: 'Street name',
        requiredMessage: 'Address is required',
    },
    {
        name: 'suite',
        placeholder: 'Suite (optional)',
    },
    {
        name: 'city',
        placeholder: 'City',
        requiredMessage: 'City is required',
    },
    {
        name: 'zipcode',
        placeholder: 'Zipcode',
        requiredMessage: 'Zipcode is required',
        keyboardType: 'number-pad',
    },
];

const UsersCreateNew: FC = () => {
    const formRef = useRef<FormikProps<any>>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const newInputs = useState<Record<string, any>>({
        // Details
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        company: '',

        // Address
        address: '', // aka 'street'
        suite: '',
        city: '',
        zipcode: '',
        geo: null,
    })[0];
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLocationAllowed, setIsLocationAllowed] = useState<boolean>(false);
    const [locationError, setLocationError] = useState<string | undefined>('Not available');

    useEffect(() => {
        _getLocationPermission();
    }, []);

    const _getLocationPermission = useCallback(async () => {
        if (!!formRef.current) {
            setIsLoading(true);
            let hasPermission = false;
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                hasPermission = (granted === PermissionsAndroid.RESULTS.GRANTED);
            }
            
            if (!!hasPermission) {
                const config: GeolocationOptions = {
                    enableHighAccuracy: false,
                    timeout: 2000,
                    maximumAge: 3600000,
                };

                Geolocation.getCurrentPosition(
                    info => {
                        formRef.current!.setFieldValue('geo', {
                            lat: info.coords.latitude,
                            lng: info.coords.longitude,
                        }, false);
                        setLocationError(undefined);
                    },
                    error => {
                        console.log('Error', error);
                        setLocationError(error.message);
                    },
                    config,
                );
                setIsLocationAllowed(true);
            }
            else {
                setIsLocationAllowed(false);
            }
            setIsLoading(false);
        }
    }, [formRef.current]);

    const _additionalValidation = (values: Record<string, any>) => {
        let errors: Record<string, string> = {};
        if (!values['geo']) {
            errors['geo'] = 'Geolocation is required';
        }
        return errors;
    }

    const geoDisplayValue = useMemo(() => {
        if (!!formRef.current) {
            if (!!isLocationAllowed) {
                let values = formRef.current.values;
                if (!!values && !!values['geo']) {
                    return `${values['geo']['lat']}, ${values['geo']['lng']}`;
                }
                return locationError;
            }
            else {
                return 'Please turn on your location';
            }
        }
    }, [formRef.current, formRef.current?.values['geo']]);

    const _submit = (values: Record<string, any>) => {
        let newUser: IUserData = {
            name: values['name'],
            username: values['username'],
            email: values['email'],
            phone: values['phone'],
            website: values['website'],
            company: {
                name: values['company'],
            },

            address: {
                street: values['address'],
                city: values['city'],
                suite: values['suite'],
                zipcode: values['zipcode'],
                geo: values['geo'],
            },
        };
        dispatch(addUser(newUser));
        navigate('/', { replace: true, });

        Toast.show({
            type: 'success',
            text1: 'New user created!',
            text2: `Welcome ${newUser.name}`
        });
    }

    return (
        <>
            <LoadingModal 
                isOpen={isLoading}
            />
            <VStack 
                px={4}
                py={5}
                w="full"
                space={2}
                alignItems="center"
            >
                <AppBar 
                    title="Create New User"
                    leading={<BackButton />}
                />
                
                <Formik 
                    innerRef={formRef}
                    initialValues={newInputs}
                    validationSchema={Yup.object().shape(
                        ([
                            ...formInputs,
                            ...formInputs_address,
                        ]).reduce<Record<string, any>>((result, item) => {
                            let validation = Yup.string();
                            // Add field type specific validation
                            switch (item.name) {
                            case 'email':
                                validation = validation.email(item.invalidMessage);
                                break;

                            case 'phone':
                                validation = validation.matches(
                                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                                    item.invalidMessage,
                                );
                                break;

                            default:
                                break;
                            }
                            // Add required validation
                            if (!!item.requiredMessage) {
                                validation = validation.required(item.requiredMessage);
                            }
                            result[item.name] = validation;
                            return result;
                        }, {})
                    )}
                    validate={_additionalValidation}
                    onSubmit={_submit}
                >
                    {({ 
                        handleChange, 
                        handleBlur, 
                        handleSubmit, 
                        values,
                        errors,
                    }) => (
                        <VStack
                            w="full"
                            space={4}
                        >
                            <Text w="full" fontSize={16} fontWeight="semibold">
                                Details
                            </Text>
                            {formInputs.map((input, i) => 
                            <CustomInput 
                                key={i}
                                value={values[input.name]}
                                placeholder={input.placeholder}
                                onChangeText={handleChange(input.name)}
                                onBlur={handleBlur(input.name)}
                                error={errors[input.name] as string}
                                keyboardType={input.keyboardType ?? 'default'}
                            />)}

                            <Divider w="full" my={1} />

                            <Text w="full" fontSize={16} fontWeight="semibold">
                                Address
                            </Text>
                            {formInputs_address.map((input, i) => 
                            <CustomInput 
                                key={i}
                                value={values[input.name]}
                                placeholder={input.placeholder}
                                onChangeText={handleChange(input.name)}
                                onBlur={handleBlur(input.name)}
                                error={errors[input.name] as string}
                                keyboardType={input.keyboardType ?? 'default'}
                            />)}

                            <VStack>
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                    flex={1}
                                >
                                    <Text flex={1} fontWeight="semibold">Geolocation{'\n'}(readonly)</Text>
                                    
                                    <HStack flex={2} space={2} alignItems="center">
                                        <Text flex={4} textAlign="right">{geoDisplayValue}</Text>
                                        {!values['geo'] &&
                                        <Button 
                                            w={12}
                                            onPress={_getLocationPermission}
                                        >
                                            <IoIcons 
                                                name="refresh"
                                                size={20}
                                                color="white"
                                            />    
                                        </Button>}
                                    </HStack>
                                </HStack>
                                {!!errors['geo'] &&
                                <ErrorCode>{errors['geo']}</ErrorCode>}
                            </VStack>

                            <CustomButton 
                                label="Submit"
                                onPress={handleSubmit}
                            />
                        </VStack>
                    )}
                </Formik>
            </VStack>
        </>
    );
}

export default UsersCreateNew;