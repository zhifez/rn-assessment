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
            mb={4}
            testID="appBar"
        >
            {/* LEADING */}
            <Box 
                flex={1}
                testID="appBar/leading"
            >
                {leading}
            </Box>

            {/* TITLE */}
            <Box flex={2}>
                <Text 
                    fontSize={16} fontWeight="bold"
                    textAlign="center"
                    testID="appBar/title"
                >
                    {title}
                </Text>
            </Box>

            {/* TRAILING */}
            <Box 
                flex={1}
                testID="appBar/trailing"
            >
                {trailing}
            </Box>
        </HStack>
    );
}

export default AppBar;