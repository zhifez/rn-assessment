import React, { FC, useState } from 'react';
import { VStack } from 'native-base';
import AppBar from '../../../components/appBar';
import BackButton from '../../../components/backButton';
import { Formik } from 'formik';
import { IUserData } from '../../../interfaces/data';
import { useAppDispatch } from '../../../hooks/common';
import { addUser } from '../../../redux/reducers/user.reducer';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';

const UsersCreateNew: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const newInputs = useState<IUserData>({
        id: 0,
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: '',
            }
        },
        phone: '',
    })[0];

    const _submit = (values: Record<string, any>) => {
        dispatch(addUser(values as IUserData));
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
                onSubmit={_submit}
            >
                
            </Formik>
        </VStack>
    );
}

export default UsersCreateNew;