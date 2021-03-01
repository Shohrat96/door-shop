import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

const routes={
    home:1,
    products:2,
    contact:3
}

const Navigation=()=>{
    const location=useLocation().pathname.split("/")[1];
    return (
        <div className={styles.navWrapper}>
            <Menu 
            style={{fontSize:"16px", color:'white'}}
            theme="dark" 
            mode="horizontal" 
            selectedKeys={location?[`${routes[location]}`]:["1"]}
            >
            <Menu.Item key="1">
                <Link to="/">
                    Əsas səhifə
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/products">
                    Kataloq
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/contact">
                    Əlaqə
                </Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/favorites">
                    Bəyəndiklərim
                </Link>
            </Menu.Item>
            </Menu>
        </div>
        
    )
}

export default Navigation