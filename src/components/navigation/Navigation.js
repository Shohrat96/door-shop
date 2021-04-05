import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {MenuUnfoldOutlined} from '@ant-design/icons';


const mapStateToProps=(state)=>({
    uid:state.auth.uid
})

const Navigation=connect(mapStateToProps)(({uid, ...rest})=>{

//     const isDesktopOrLaptop = useMediaQuery({
//     query: '(min-device-width: 1224px)'
//   })
//     const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
//     const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isMobileDevice = useMediaQuery({
    query: '(max-device-width: 576px)'
  })
    const routes={
        home:1,
        products:2,
        contact:3,
        favorites:4
    }
    if (uid){
        routes["orders"]=5
    }
    const [menuCollapsed, setMenuCollapsed]=useState(true);
    const location=useLocation().pathname.split("/")[1];
    if (isMobileDevice){
        return (
            <div className={styles.menuWrapMobile}>
                <MenuUnfoldOutlined 
                style={{color:'white', fontSize:'30px'}}
                onClick={()=>setMenuCollapsed(!menuCollapsed)}/>
                {
                    !menuCollapsed?(
                        <Menu 
                        style={{fontSize:"16px",  backgroundColor:'black'}}
                        className={styles.navWrap}
                        theme="dark" 
                        onSelect={()=>setMenuCollapsed(true)}
                        mode="vertical" 
                        selectedKeys={location?[`${routes[location]}`]:["1"]}
                        >
                        <Menu.Item className={styles.navItem} key="1">
                            <Link to="/">
                                Əsas səhifə
                            </Link>
                        </Menu.Item>
                        <Menu.Item className={styles.navItem} key="2">
                            <Link to="/products">
                                Kataloq
                            </Link>
                        </Menu.Item>
                        <Menu.Item className={styles.navItem} key="3">
                            <Link to="/useful">
                                Bilmək faydalıdır
                            </Link>
                        </Menu.Item>
                        {
                            uid? (
                                <Menu.Item className={styles.navItem} key="5">
                                    <Link to="/orders">
                                        Sifarişlər
                                    </Link>
                                </Menu.Item>
                            ):null
                        }
                        <Menu.Item className={styles.navItem} key="4">
                            <Link to="/favorites">
                                Bəyəndiklərim
                            </Link>
                        </Menu.Item>
                    </Menu>
                    ):null
                }
            </div>
        )
    }
    return (
        <Menu 
            style={{fontSize:"16px",  backgroundColor:'black'}}
            className={styles.navWrap}
            theme="dark" 
            mode="horizontal" 
            selectedKeys={location?[`${routes[location]}`]:["1"]}
            >
            <Menu.Item className={styles.navItem} key="1">
                <Link to="/">
                    Əsas səhifə
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.navItem} key="2">
                <Link to="/products">
                    Kataloq
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.navItem} key="3">
                <Link to="/useful">
                    Bilmək faydalıdır
                </Link>
            </Menu.Item>
            {
                uid? (
                    <Menu.Item className={styles.navItem} key="5">
                        <Link to="/orders">
                            Sifarişlər
                        </Link>
                    </Menu.Item>
                ):null
            }
            <Menu.Item className={styles.navItem} key="4">
                <Link to="/favorites">
                    Bəyəndiklərim
                </Link>
            </Menu.Item>
        </Menu>        
    )
})

export default Navigation