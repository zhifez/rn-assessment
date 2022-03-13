import { HStack, Text } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { IDefault } from '../interfaces/common';

interface ICustomButton extends IDefault {
    label: string;
    onPress: () => void;
}

const CustomButton: FC<ICustomButton> = ({
    label,
    onPress,
    testID,
}) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={onPress}
            testID={testID}
        >
            <HStack 
                p={3}
                bgColor="blue.500"
                justifyContent="center"
                alignItems="center"
            >
                <Text 
                    fontWeight="semibold"
                    color="white"
                >
                    {label}
                </Text>
            </HStack>
        </TouchableOpacity>
    );
}

export default CustomButton;