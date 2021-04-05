import React from 'react';
import { Modal } from 'antd';


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
          footer={null}
          {...props}
        >
          {children}
        </Modal>
    )
}
export default ConfirmModal