import React from 'react';
import { Modal } from 'antd';

const CustomModal = (props) => {
    const { open, hideModal, performAction, title } = props;
    return (
        <Modal
            title="Basic Modal"
            onOk={performAction}
            open={open}
            onCancel={hideModal}
            okText="ok"
            cancelText="Cancel"
        >
            <p>{title}</p>
        </Modal>
    );
};

export default CustomModal;
