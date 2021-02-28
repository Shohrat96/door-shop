import React, { useState } from 'react';
import styles from './ConfirmModal.module.scss';
import { Modal, Button, Space } from 'antd';


const ConfirmModal=({onOk, onCancel,visible})=>{

    return (
        <Modal
          title="Silmə əməliyyatını təsdiq edin"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          okText="Təsdiqlə"
          cancelText="İmtina"
        ></Modal>
    )
}
export default ConfirmModal