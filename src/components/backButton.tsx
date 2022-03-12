import React, { FC } from 'react';
import { Box } from 'native-base';
import { TouchableOpacity } from 'react-native';
import IoIcons from 'react-native-vector-icons/Ionicons';
import { useNavigate } from 'react-router-native';

const BackButton: FC = () => {
    const navigate = useNavigate();

    const _back = () => {
        navigate(-1);
    }

    return (
        <TouchableOpacity
            onPress={_back}
        >
            <Box 
                p={2}
                w={10}
                h={10}
            >
                <IoIcons 
                    name="chevron-back"
                    size={20}
                    color="black"
                />
            </Box>
        </TouchableOpacity>
    );
}

export default BackButton;