import React, { useEffect } from "react";
import { Form, Input, InputNumber, Space } from "antd";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import CustomBtn from "../CustomBtn/CustomBtn";
import styles from "./SubmitOrderForm.module.scss";

const SubmitOrderForm = ({ visible, onCreate, onCancel, isExtraSmall }) => {
  const [form] = Form.useForm();
  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("validation error: ", info);
      });
  };
  useEffect(() => {
    form.resetFields();
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);
  return (
    <ConfirmModal visible={visible} title={"Sorğu göndər"} onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={
          {
            //   modifier: 'public',
          }
        }
      >
        <Form.Item
          name={"name"}
          label="Ad"
          rules={[{ required: true, message: "Adınızı qeyd edin" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"count"}
          label="Neçə ədəd"
          rules={[{ required: true, message: "Qapı sayını qeyd edin" }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Mobil nömrə"
          rules={[{ required: true, message: "Mobil nömrənizi qeyd edin" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Ünvan (şəhər, inzibati rayon və s.)"
          rules={[{ required: true, message: "Ünvanı qeyd edin" }]}
        >
          <Input />
        </Form.Item>
        <Space className={styles.buttonsWrap}>
          <CustomBtn
            mode="link"
            onClick={onCancel}
            title="Ləğv et"
            style={{
              backgroundColor: "white",
              color: "brown",
              border: "1px solid brown",
              padding: isExtraSmall && "10px 22px",
            }}
          />
          <CustomBtn
            title="Təsdiqlə"
            onClick={onOk}
            style={{
              padding: isExtraSmall && "10px 22px",
            }}
          />
        </Space>
      </Form>
    </ConfirmModal>
  );
};

export default SubmitOrderForm;
