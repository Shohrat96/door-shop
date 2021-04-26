import React from 'react';
import { Layout} from 'antd';
import Navigation from '../components/navigation/Navigation';
import styles from './CustomLayout.module.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home/Home';
import Products from './Products/Products';
import UsefulInfo from './UsefulInfo/UsefulInfo';
import SingleDoorPage from './singleDoorPage/SingleDoorPage';
import { SocialIcon } from 'react-social-icons';
import CreateProduct from './CreateProduct/CreateProduct';
import FavoritesPage from './FavoritesPage/FavoritesPage';
import OrdersPage from './OrdersPage/OrdersPage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AuthPage from './AuthPage/AuthPage';
import CustomMap from '../components/CustomMap/CustomMap';


const CustomLayout=(props)=>{

const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 40.42216,
    lng: -122.08427,
}
    const { Header, Content, Footer } = Layout;
    const pathName=useLocation().pathname;
    
    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.headerContent}>
                    <Navigation style={{marginRight:"auto"}}/>

                    <ul className={styles.contactWrapper}>
                        <div className={styles.socialsWrapper}>
                            <SocialIcon fgColor="white" style={{width:'30px', height:'30px'}} url="https://www.instagram.com/qapidunyasi_/" />
                            <SocialIcon fgColor="white" style={{width:'30px', height:'30px', marginLeft:"10px"}} url="https://www.facebook.com/QapiDunyasi1" />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', margin:'0 10px 0 15px'}}>
                            <div style={{display:'flex', lineHeight:'20px'}}>
                                <span style={{marginRight:'5px', padding:0}}>070-597-27-10 |</span>                            
                                <span style={{margin:0, padding:0}}>055-539-36-96</span>
                            </div>
                            <span style={{margin:0, padding:0, lineHeight:"20px"}}>E-mail: dunya.qapilari.contact@gmail.com</span>
                        </div>
                    </ul>
                </div>
            </Header>
                <Content className={styles.contentWrapper}>
                <div className={styles.content}>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/products" component={Products} exact />
                        <Route path="/useful" component={UsefulInfo} />
                        <Route path="/favorites" component={FavoritesPage}/>
                        <ProtectedRoute path="/products/newProduct" component={CreateProduct} exact />
                        <ProtectedRoute path="/products/editProduct/:id" component={CreateProduct} exact />
                        <Route path="/products/:id" component={SingleDoorPage} exact/>
                        <ProtectedRoute path="/orders" component={OrdersPage}/>
                        <ProtectedRoute path="/admin" component={Products}/>
                        <Route path="/login" component={AuthPage}/>
                    </Switch>

                </div>
                </Content>
                <Footer className={styles.footer}>
                    {
                        pathName!=="/contact"?<CustomMap location={location} zoomLevel={17}/>:null
                    }
                    <div className={styles.copyRight}>
                        <span>©{new Date().getFullYear()} Dünya Qapıları </span>
                    </div>
                </Footer>
        </Layout>
    )
}

export default CustomLayout