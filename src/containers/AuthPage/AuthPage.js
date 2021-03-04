import React from 'react';
import styles from './AuthPage.module.scss';
import { Form, Input } from 'antd';
import { logIn } from '../../store/reducers/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CustomBtn from '../../components/CustomBtn/CustomBtn'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const mapStateToProps=(state)=>({
    auth:state.auth
})


const AuthPage=connect(mapStateToProps, {logIn})(({logIn, auth})=>{
    const onFinish=(values)=>{
        logIn(values.email, values.password)
    }
    if (auth.uid){
        return (
            <Redirect to="/"/>
        )
    } else {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Auth Page</h1>
                <Form
                {...layout}
                onFinish={onFinish}
                style={{maxWidth:"50%", margin:"0 auto"}}
                labelAlign={"left"}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required:true, message:"Email daxil edin"}]}
                    
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required:true, message:"Şifrə daxil edin"}]}
                    
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <CustomBtn title="Daxil ol"/>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    
})

export default AuthPage