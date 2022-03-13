import { Box, IModalProps, Modal, VStack } from 'native-base';
import React, { FC } from 'react';
import * as Progress from 'react-native-progress';

interface ILoadingModal extends IModalProps {
    
}

const LoadingModal: FC<ILoadingModal> = ({
    ...field
}) => {
    return (
        <Modal
            {...field}
            justifyContent="center"
            alignItems="center"
        >
            <Progress.Circle 
                size={40} 
                borderWidth={2}
                color="white"
                indeterminate 
            />
        </Modal>
    );
}

export default LoadingModal;