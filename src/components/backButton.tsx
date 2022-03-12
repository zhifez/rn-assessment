import { Box } from 'native-base';
import React, { FC } from 'react';
import IoIcons from 'react-native-vector-icons/Ionicons';

const BackButton: FC = () => {
    return (
        <Box>
            <IoIcons 
                name="chevron-back"
                size={16}
                color="black"
            />
        </Box>
    );
}

export default BackButton;