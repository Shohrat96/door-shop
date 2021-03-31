import React, { useEffect, useState } from 'react';
import App from '../../firebase/firebaseConfig';
import styles from './SingleDoorPage.module.scss';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import { Modal, Button } from 'antd';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import SubmitOrderForm from '../../components/SubmitOrderForm/SubmitOrderForm';


const SingleDoorPage=(props)=>{
    const [modalVisible, setModalVisible]=useState(false)
    const {id}=props.match.params;
    const [singleDoor, setSingleDoor]=useState({})
    useEffect(()=>{
        let result={};
        let doorRef= App.db.ref('products').child(id);
        doorRef.on('value',(snapshot)=>{
            console.log('snap: ',snapshot.val());
            result=snapshot.val();
            setSingleDoor(result)
        })
    },[])
    return (
        <div className={styles.container}>
            <SubmitOrderForm 
            visible={modalVisible} 
            onCreate={
                (values)=>{
                    App.db.ref("orders").push({order:values,product:singleDoor, isComplete:false, canceled:false});
                    setModalVisible(false);
                }
            }
            onCancel={()=>setModalVisible(false)}
            />
            <div className={styles.imgWrap}>
                {
                    <img className={styles.img} src={singleDoor?.image} alt="some-door-pic"/>
                }
            </div>
            <div className={styles.imageData}>
                <div className={`${styles.metaField} ${styles.title}`}>
                    {singleDoor.title}
                </div>
                <div className={styles.metaField}>
                    <p className={styles.price}>
                        {singleDoor.price} AZN
                    </p>
                    <p style={{fontStyle:'italic', fontWeight:'bold'}}>
                        Qiymətə daxildir: Qapı, çərçivə, ikiüzlü yaşmaq, kilit-dəstək.
                    </p>
                </div>

                <section className={styles.order}>
                    <CustomBtn title="Sifariş et" onClick={()=>setModalVisible(true)} />
                    <p style={{fontStyle:'italic', fontWeight:'bold'}}>
                        Sifariş verin, ən qısa zamanda əməkdaşlarımız Sizinlə əlaqə saxlasınlar.
                    </p>
                </section>

                <div className={styles.seperator}>

                </div>
                <div className={styles.metaFieldWrap}>
                    <div className={styles.metaField}>
                        <label className={styles.metaLabel}>İstehsalçı ölkə</label>
                        <p className={styles.metaValue}>{singleDoor.country}fdsfsdf dfsdfdfdfd</p>
                    </div>
                    <div className={styles.metaField}>
                        <label className={styles.metaLabel}>Material</label>
                        <p className={styles.metaValue}>{singleDoor.material}</p>
                    </div>
                    <div className={styles.metaField}>
                        <label className={styles.metaLabel}>Üzlük</label>
                        <p className={styles.metaValue}>{singleDoor.cover}</p>
                    </div>
                    <div className={styles.metaField}>
                        <label className={styles.metaLabel}>Əlavə məlumatlar</label>
                        <p className={styles.metaValue}>{singleDoor.other}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleDoorPage