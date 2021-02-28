import React from 'react';
import { Layout} from 'antd';
import Navigation from '../components/navigation/Navigation';
import styles from './CustomLayout.module.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Products from './Products/Products';
import Contact from './Contact/Contact';
import SingleDoorPage from './singleDoorPage/SingleDoorPage';
import { SocialIcon } from 'react-social-icons';
import CreateProduct from './CreateProduct/CreateProduct';

const CustomLayout=(props)=>{
    const { Header, Content, Footer } = Layout;

    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <div className="logo"></div>
                <Navigation/>
                
                <ul style={{display:"flex", color:"white", margin:0, marginLeft:'auto'}}>
                    <div style={{display:'flex', justifyContent:"center", alignItems:'center'}}>
                        <SocialIcon fgColor="white" style={{width:'30px', height:'30px'}} url="https://www.instagram.com/qapidunyasi_/" />
                        <SocialIcon fgColor="white" style={{width:'30px', height:'30px', marginLeft:"10px"}} url="https://www.facebook.com/QapiDunyasi1" />
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:'15px'}}>
                        <span style={{margin:0, padding:0, lineHeight:"20px"}}>Mobil: (+994)70-597-27-10</span>
                        <span style={{margin:0, padding:0, lineHeight:"20px"}}>E-mail: garadaghlishohrat@gmail.com</span>
                    </div>
                   
                </ul>

            </Header>
            <Content className={styles.contentWrapper}>
            
            <div className={styles.content}>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/products" component={Products} exact />
                    <Route path="/contact" component={Contact} />
                    <Route path="/products/newProduct" component={CreateProduct} exact />
                    <Route path="/products/editProduct/:id" component={CreateProduct} exact />
                    <Route path="/products/:id" component={SingleDoorPage} exact/>
                    <Route path="/admin" render={(props)=><Products admin={true} {...props}/>} exact />
                </Switch>

            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©{new Date().getFullYear()} Qapı Dünyası </Footer>
        </Layout>
    )
}

export default CustomLayout