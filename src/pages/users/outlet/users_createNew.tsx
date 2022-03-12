import React, { FC, useState } from 'react';
import { Input, Text, VStack } from 'native-base';
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
    requiredMessage: string;
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
        requiredMessage: 'Email is required',
    },
    {
        name: 'phone',
        placeholder: 'E.g. 0123456789',
        requiredMessage: 'Phone number is required',
        keyboardType: 'phone-pad',
    },
];

const UsersCreateNew: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const newInputs = useState<Record<string, any>>({
        name: '',
        username: '',
        email: '',
        phone: '',
        // address: {
        //     street: '',
        //     city: '',
        //     zipcode: '',
        //     geo: {
        //         lat: '',
        //         lng: '',
        //     }
        // },
    })[0];

    const _submit = (values: Record<string, any>) => {
        // values[]
        // dispatch(addUser(values as IUserData));
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
                    formInputs.reduce<Record<string, any>>((result, item) => {
                        result[item.name] = Yup.string().required(item.requiredMessage);
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
                        {formInputs.map((input, i) => 
                        <CustomInput 
                            key={i}
                            value={values[input.name]}
                            placeholder={input.placeholder}
                            onChangeText={handleChange(input.name)}
                            onBlur={handleBlur(input.name)}
                            error={errors[input.name] as string}
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