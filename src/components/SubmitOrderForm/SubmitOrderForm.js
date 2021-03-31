import React, { useState, useEffect } from 'react';
import { Form, Input, Select, InputNumber, Space } from 'antd';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import CustomBtn from '../CustomBtn/CustomBtn';
import styles from './SubmitOrderForm.module.scss';


const SubmitOrderForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const onOk=()=>{
    form
    .validateFields()
    .then((values)=>{
        form.resetFields();
        onCreate(values)
    })
    .catch((info)=>{
        console.log("validation error: ",info)
    })
  }
  useEffect(() => {
    form.resetFields()
    if (visible){
      form.resetFields()
    }
  }, [visible, form])
  return (
    <ConfirmModal
    visible={visible}
    title={"Sifariş et"}
    onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
        //   modifier: 'public',
        }}
      >
      <Form.Item name={"name"} label="Ad" rules={[{ required: true, message:"Adınızı qeyd edin" }]}>
        <Input />
      </Form.Item>
      <Form.Item name={"count"} label="Neçə ədəd" rules={[{ required: true, message:"Qapı sayını qeyd edin" }]}>
        <InputNumber min={1} />
      </Form.Item>
        
        <Form.Item
        name="phone"
        label="Mobil nömrə"
        rules={[{ required: true, message: 'Mobil nömrənizi qeyd edin' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Space className={styles.buttonsWrap}>
        <CustomBtn
        mode="link" 
        onClick={onCancel}
        title="Ləğv et" 
        style={{backgroundColor:"white", color:'brown', border:'1px solid brown'}}
        />
        <CustomBtn title="Təsdiqlə" onClick={onOk}/>
      </Space>

      </Form>
    </ConfirmModal>
  );
};

export default SubmitOrderForm