import React, { useState } from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const {Option}=Select;


// const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select style={{ width: 70 }}>
//         <Option value="86">50</Option>
//         <Option value="87">55</Option>
//         <Option value="87">70</Option>
//         <Option value="87">77</Option>
//         <Option value="87">51</Option>
//       </Select>
//     </Form.Item>
//   );

const SubmitOrderForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <ConfirmModal
    visible={visible}
    title={"Sifariş et"}
    onCancel={onCancel}
    onOk={()=>{
        form
            .validateFields()
            .then((values)=>{
                form.resetFields();
                onCreate(values)
            })
            .catch((info)=>{
                console.log("validation error: ",info)
            })
    }}
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
      <Form.Item name={"surname"} label="Soyad" rules={[{ required: true, message:"Soyadınızı qeyd edin" }]}>
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
      </Form>
    </ConfirmModal>
  );
};

export default SubmitOrderForm