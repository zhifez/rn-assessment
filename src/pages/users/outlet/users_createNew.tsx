import React, { FC, useState } from 'react';
import { Divider, Input, Text, VStack } from 'native-base';
import AppBar from '../../../components/appBar';
import BackButton from '../../../components/backButton';
import { Formik } from 'formik';
import { IUserData } from '../../../interfaces/data';
import { useAppDispatch } from '../../../hooks/common';
import { addUser } from '../../../redux/reducers/user.reducer';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';
import styled from 'styled-components/native';
import CustomButton from '../../../components/customButton';
import CustomInput from '../../../components/customInput';
import { KeyboardType } from 'react-native';

interface IInputConfig {
    name: string;
    placeholder: string;
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
        geo: {
            lat: '',
            lg: '',
        },
    })[0];

    const _submit = (values: Record<string, any>) => {
        console.log(values);
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
    }

    return (
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
                        <CustomButton 
                            label="Submit"
                            onPress={handleSubmit}
                        />
                    </VStack>
                )}
            </Formik>
        </VStack>
    );
}

export default UsersCreateNew;