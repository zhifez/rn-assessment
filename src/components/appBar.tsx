import { Box, HStack, Text } from 'native-base';
import React, { FC } from 'react';

interface IAppBar {
    title: string;
    leading?: JSX.Element;
    trailing?: JSX.Element;
}

const AppBar: FC<IAppBar> = ({
    title,
    leading,
    trailing,
}) => {
    return (
        <HStack 
            w="full"
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            mb={8}
        >
            {/* LEADING */}
            <Box flex={1}>{leading}</Box>

            {/* TITLE */}
            <Box flex={2}>
                <Text 
                    fontSize={16} fontWeight="bold"
                    textAlign="center"
                >
                    @{title}
                </Text>
            </Box>

            {/* TRAILING */}
            <Box flex={1}>{trailing}</Box>
        </HStack>
    );
}

export default AppBar;