import React, { useEffect, useState } from 'react';
import App from '../../firebase/firebaseConfig';
import styles from './SingleDoorPage.module.scss';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import SubmitOrderForm from '../../components/SubmitOrderForm/SubmitOrderForm';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../../store/reducers/products';
import Loader from '../../components/Loader/Loader';

const mapStateToProps=(state)=>({
    loading:state.products.loading
})

const SingleDoorPage=connect(mapStateToProps,{setLoadingTrue, setLoadingFalse})((props)=>{
    const [modalVisible, setModalVisible]=useState(false);
    
    // const isDesktopOrLaptop = useMediaQuery({
    //     query: '(min-device-width: 1224px)'
    //   })
    //     const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    //     const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    //     const isMobileDevice = useMediaQuery({
    //     query: '(max-device-width: 576px)'
    //   });
      const isExtraSmall = useMediaQuery({
        query: '(max-device-width: 450px)'
      })
    const {id}=props.match.params;
    const {loading, setLoadingFalse, setLoadingTrue}=props;

    const [singleDoor, setSingleDoor]=useState({})
    useEffect(()=>{
        setLoadingTrue();
        let result={};
        let doorRef= App.db.ref('products').child(id);
        doorRef.on('value',(snapshot)=>{
            result=snapshot.val();
            setSingleDoor(result);
            setLoadingFalse()
        })
    },[])
    if (loading){
        return (
            <div className={styles.container}>
                <Loader/>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <SubmitOrderForm 
            isExtraSmall={isExtraSmall}
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
                {
                    !isExtraSmall?(
                        <>
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
                                <p className={styles.metaValue}>{singleDoor.country}</p>
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
                        </>
                    ):null
                }

            
            {
                isExtraSmall?(
                    <div style={{flexBasis:'100%',height:'0'}}></div>
                ):null
            }
            {
                isExtraSmall?(
                    <div>
                        <section className={styles.order} style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px'}}>
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
                                <p className={styles.metaValue}>{singleDoor.country}</p>
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
                ): null
            }
            </div>
        </div>
    )
})

export default SingleDoorPage