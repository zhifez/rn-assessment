import { IInputProps, Input, Text, VStack } from 'native-base';
import React, { FC } from 'react';
import styled from 'styled-components/native';

export const ErrorCode = styled(Text)`
    font-size: 10px;
    color: red;
`;

interface ICustomInput extends IInputProps {
    error?: string;
}

const CustomInput: FC<ICustomInput> = ({
    error,
    ...fields
}) => {
    return (
        <VStack 
            w="full"
            space={1}
        >
            <Input 
                {...fields}
            />
            {!!error && 
            <ErrorCode>{error}</ErrorCode>}
        </VStack>
    );
}

export default CustomInput;