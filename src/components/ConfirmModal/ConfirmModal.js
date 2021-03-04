import React, { useState } from 'react';
import styles from './ConfirmModal.module.scss';
import { Modal, Button, Space } from 'antd';


const ConfirmModal=(props)=>{
  const {onOk, onCancel,visible, children}=props;
    return (
        <Modal
          title="Silmə əməliyyatını təsdiq edin"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          okText="Təsdiqlə"
          cancelText="İmtina"
          {...props}
        >
          {children}
        </Modal>
    )
}
export default ConfirmModal