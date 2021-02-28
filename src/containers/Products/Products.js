import React, { useState,useEffect } from 'react';
import DoorCard from '../../doorCard/DoorCard';
import styles from './Products.module.scss';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { setProducts, deleteProduct} from '../../store/reducers/products';
import { connect } from 'react-redux';


const mapStateToProps=(state)=>({
    products:state.products
})

const Products=connect(mapStateToProps, {setProducts})((props)=>{
    const {setProducts, products}=props;
    const historyRef=useHistory();
    const [showModal, setShowModal]=useState({
        show:false,
        prodId:null
    });
    const {admin}=props;

    useEffect(()=>{
        setProducts();
    },[setProducts])

    const deleteOkHandler=(id)=>{
        deleteProduct(id);
        setShowModal({show:false, prodId:null});
    }

    return (
        <div className={styles.container}>
            <ConfirmModal 
            visible={showModal.show} 
            onCancel={()=>setShowModal({
                show:false,
                prodId:null
            })}
            onOk={()=>deleteOkHandler(showModal.prodId)}
            />
            <div className={styles.titleSection}>
                {
                    admin&&(
                        <CustomBtn 
                        title={"+"} 
                        onClick={()=>historyRef.push('products/newProduct')}
                        style={{
                            width:'50px',
                            height:'50px',
                            borderRadius:'25px',
                            display:'flex',
                            fontSize:'20px',
                            lineHeight:'0',
                            justifyContent:'center',
                            alignItems:'center',
                            outline:'none',
                            border:'none',
                        }}/>
                    )
                }
                <h1 className={styles.title}>
                    KATALOQ
                </h1>
            </div>
            
            <section className={styles.products}>
                {
                    !admin?
                    products.map((item,index)=>{
                        return (
                            <DoorCard door={item} key={index}/>
                        )
                    }): 
                    products.map((item,index)=>{
                        return (
                            <div className={styles.cardWrapper}>
                                <DoorCard door={item} key={index}/>
                                <div 
                                className={styles.deleteBtn}
                                onClick={()=>setShowModal({show:true, prodId:item.id})}
                                >X</div>
                                <div 
                                style={{position:'absolute', top:"-20px", left:"10px", cursor:"pointer"}}
                                onClick={()=>historyRef.push(`products/editProduct/${item.id}`)}
                                >Edit</div>
                            </div>
                        )
                    })
                }
            </section>
            
        </div>
    )
})

export default Products