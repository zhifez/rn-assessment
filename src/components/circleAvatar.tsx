import { Box, Image } from 'native-base';
import React, { FC } from 'react';

interface ICircleAvatar {
    avatarUri: string;
}

const CircleAvatar: FC<ICircleAvatar> = ({
    avatarUri,
}) => (
    <Box
        w={20}
        h={20}
        borderRadius="full"
        overflow="hidden"
        bgColor="gray.100"
    >
        <Image 
            w="full"
            h="full"
            source={{
                uri: avatarUri,
            }}
            alt="user_avatar"
        />
    </Box>
);

export default CircleAvatar;