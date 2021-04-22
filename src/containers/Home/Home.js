import React from 'react';
import styles from './Home.module.scss'
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import { useHistory } from 'react-router-dom';
import { Result } from 'antd';

const Home=()=>{
    let history=useHistory();

    return (
        <div className={styles.container}>
            <div className={styles.titleWrap}>
                <h1 className={styles.title}>
                    <span className={styles.titleMain}>DÜNYA QAPILARI</span>
                    <span className={styles.titleSub}>ETİBARINIZ UĞURUMUZDUR</span>
                </h1>
            </div>
            <div className={styles.btnContainer}>
               <CustomBtn
               onClick={()=>history.push("/products")}
               title="MƏHSULLARA KEÇ" 
               className={styles.catalogBtn}/>
            </div>
        </div>
    )
}

export default Home