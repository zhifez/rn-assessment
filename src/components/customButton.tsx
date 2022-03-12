import { Box, HStack, Text } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface ICustomButton {
    label: string;
    onPress: () => void;
}

const CustomButton: FC<ICustomButton> = ({
    label,
    onPress,
}) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={onPress}
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