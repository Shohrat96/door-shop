import React, { useState, useEffect } from 'react';
import styles from './CreateProduct.module.scss';
import { Upload, message, Button, Form, Input, InputNumber,Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import App from '../../firebase/firebaseConfig';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import { useHistory } from 'react-router-dom'
import { editProduct, addNewProduct } from '../../store/reducers/products';
import { connect } from 'react-redux';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const mapDispatchToProps=(dispatch)=>({
  editProduct:(product)=>dispatch(editProduct(product)),
  addNewProduct:(product)=>dispatch(addNewProduct(product))
})
const CreateProduct=connect(null, mapDispatchToProps)((props)=>{
    const {editProduct, addNewProduct}=props;
    const historyRef=useHistory()
    const [form]=Form.useForm();
    const [initialValues, setInitialValues]=useState(null);
    const {id}=props.match.params;
    useEffect(()=>{ 
      if (id){
        const prodRef=App.db.ref("products").child(id);
        prodRef.get()
        .then(snapshot=>{
          form.setFieldsValue(snapshot.val());
          setInitialValues(snapshot.val())
          setImage(snapshot.val().image)
        });
      }
    },[]);

    const [image, setImage]=useState(null);
    const [imageAlreadyUploaded, setImageUploaded]=useState(false);

    const onChange=(info)=>{
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      };
    const onFinish = async (values) => {
      if (id){
        editProduct({...values,image, id});
        historyRef.push("/admin")
        return
      }
      if (!image){
        alert('Choose image')
        return
      } else {
        console.log("create: ",{...values, image});
        // let other=values.other || ''
        await addNewProduct({...values, image});
        historyRef.push("/admin")
      }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const customRequest = ({ file, onSuccess }) => {
      let alreadyUploadedImages=[];
      const ref= App.storage.ref(`roomDoors`);
      ref.list().then(snapshot=>{
        snapshot.items.forEach(item=>alreadyUploadedImages.push(item.name))
        if (alreadyUploadedImages.includes(file.name)){
          setImageUploaded(true);
        };
        const uploadTask=App.storage.ref(`roomDoors/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot=>{},
            error=>console.log('error: ',error),
            ()=>{
                App.storage
                    .ref("roomDoors")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url=>{
                        setImage(url);
                        onSuccess();
                    })
            }
        )
      })

      };

      const removeHandler=(img)=>{
        if (imageAlreadyUploaded){
          setImage(null);
          setImageUploaded(false);
          return
        }
        const deleteTask=App.storage.ref(`roomDoors/${img.name}`).delete();
        deleteTask
        .then((res)=>{setImage(null)})
        .catch((err)=>console.log('error: '.err));
      }

      
    return (
        <div className={styles.container}>
            <div className={styles.imgUpload}>
                <Upload
                onChange={onChange} 
                customRequest={customRequest}
                onRemove={removeHandler}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              <div className={styles.imgContainer}>
                <img src={image} alt="door pic"/>
              </div>
            </div>
            <div className={styles.productDetails}>
              <Form
                {...layout}
                form={form}
                name="basic"
                setFieldsValue={initialValues?{...initialValues}:{}}
                initialValues={{other:''}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Ad"
                  name="title"
                  rules={[{ required: true, message: 'Məhsulun adını qeyd edin!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Qiymət (AZN)"
                  name="price"
                  rules={[{ required: true, message: 'Qiyməti qeyd edin!' }]}
                >
                  <InputNumber min={1}/>
                </Form.Item>

                <Form.Item
                  label="Material"
                  name="material"
                  rules={[{ required: true, message: 'Materialı qeyd edin!' }]}
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  label="Rəng"
                  name="color"
                  rules={[{ required: true, message: 'Rəngi qeyd edin!' }]}
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  label="Üzlük"
                  name="cover"
                  rules={[{ required: true, message: 'Üzlük materialı qeyd edin!' }]}
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                  label="İstehsalçı ölkə"
                  name="country"
                  rules={[{ required: true, message: 'İstehsalçı ölkəni qeyd edin!' }]}
                >
                  <Select
                  >
                    <Option value="Rusiya">Rusiya</Option>
                    <Option value="Ukrayna">Ukrayna</Option>
                    <Option value="Belarusiya">Belarusiya</Option>

                  </Select>
                </Form.Item>

                <Form.Item
                  label="Kateqoriya"
                  name="category"
                  rules={[{ required: true, message: 'Kateqoriyanı seçin!' }]}
                >
                  <Select
                  >
                    <Option value="1">Otaq</Option>
                    <Option value="2">Dəmir qapı</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Əlavə məlumatlar (vacib deyil)"
                  name="other"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  {/* <Button type="primary" htmlType="submit">
                    Submit
                  </Button> */}
                  <CustomBtn title={"Təsdiqlə"} htmlType="submit" style={{float:"right"}}/>
                </Form.Item>
              </Form>
            </div>
        </div>
    )
})
export default CreateProduct