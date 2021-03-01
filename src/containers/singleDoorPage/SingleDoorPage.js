import React, { useEffect, useState } from 'react';
import App from '../../firebase/firebaseConfig';
import styles from './SingleDoorPage.module.scss';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import sizeImg from '../../assets/img/door-place-sizes.png'
import { Table } from 'antd';


const SingleDoorPage=(props)=>{
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
    console.log('props: ',props)
    return (
        <div className={styles.container}>
            <div className={styles.imgWrap}>
                {
                    <img className={styles.img} src={singleDoor.image} alt="some-door-pic"/>
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
                    <input type="number" className={styles.countField} defaultValue={1}/>
                    <CustomBtn title="Sifariş et"/>
                    <p style={{fontStyle:'italic', fontWeight:'bold'}}>
                        Sifariş verin, ən qısa zamanda əməkdaşlarımız Sizinlə əlaqə saxlasınlar.
                    </p>
                </section>

                <div className={styles.seperator}>

                </div>

                <div className={styles.metaField}>
                    <label className={styles.metaLabel}>İstehsalçı ölkə: </label>
                    <p className={styles.metaValue}>{singleDoor.country}</p>
                </div>
                <div className={styles.metaField}>
                    <label className={styles.metaLabel}>Material: </label>
                    <p className={styles.metaValue}>{singleDoor.material}</p>
                </div>
                <div className={styles.metaField}>
                    <label className={styles.metaLabel}>Üzlük: </label>
                    <p className={styles.metaValue}>{singleDoor.cover}</p>
                </div>
                <div className={styles.metaField}>
                    <label className={styles.metaLabel}>Əlavə məlumatlar: </label>
                    <p className={styles.metaValue}>{singleDoor.other}</p>
                </div>
            </div>
            <div className={styles.additionalInfo}>
                <div className={styles.sizeImg}>
                    <img src={sizeImg} alt="sizes-pic" style={{width:'100%', marginBottom:"10px"}} />
                    <h3>Qapının yeri üçün tələb olunan ölçülər</h3>
                    <table className={styles.sizeTable}>
                        <tr>
                            <th>En</th>
                            <th>Hündürlük</th>
                        </tr>
                        <tr>
                            <td>88-90sm</td>
                            <td>205-207sm</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SingleDoorPage