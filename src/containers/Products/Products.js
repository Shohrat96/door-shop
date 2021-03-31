import React, { useState,useEffect } from 'react';
import DoorCard from '../../doorCard/DoorCard';
import styles from './Products.module.scss';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { setProducts, deleteProduct, setSortType, filterProducts} from '../../store/reducers/products';
import { connect } from 'react-redux';
import { Select } from 'antd';
import Loader from '../../components/Loader/Loader';
import { setCategoriesAction } from '../../store/reducers/categories';

const {Option}=Select;

const mapStateToProps=(state)=>({
    products:state.products.products,
    loading:state.products.loading,
    sortType:state.products.sortType,
    filterCat:state.products.filterCat,
    productsToShow:state.products.productsToShow,
    admin:state.auth.uid,
    categories:state.categories,
})

const Products=connect(mapStateToProps, {setProducts, deleteProduct, setSortType, setCategoriesAction, filterProducts})((props)=>{
    const {productsToShow, setProducts, deleteProduct, setSortType, sortType, loading, setCategoriesAction, categories, filterProducts, filterCat}=props;
    let {products}=props;
    const historyRef=useHistory();
    const [showModal, setShowModal]=useState({
        show:false,
        prodId:null
    });
    if (productsToShow.length>0){
        products=productsToShow
    }
    const {admin}=props;

    useEffect(()=>{
        setProducts();
        setCategoriesAction()
    },[])

    const deleteOkHandler=(id)=>{
        deleteProduct(id);
        setShowModal({show:false, prodId:null});
    }
    const sortByPrice=(v)=>{
        setSortType(v)
    }
    const filterHandler=(selected)=>{
        console.log("event: ",selected);
        filterProducts(selected);
        if (sortType){
            setSortType(sortType)
        }
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
                <h1 className={styles.title}>
                    KATALOQ
                </h1>
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

            </div>
            <div className={styles.sortAndFilterWrapper}>
                <div className={styles.sortWrapper}>
                    <label style={{marginRight:10, fontWeight:'bold', fontSize:'1rem'}}>Sırala</label>
                    <Select value={sortType} defaultValue="asc" style={{ width: 200 }} onChange={(v)=>sortByPrice(v)}>
                            <Option value="asc">Qiymət üzrə artan</Option>
                            <Option value="desc">Qiymət üzrə azalan</Option>
                    </Select>   
                </div>
                <div className={styles.filterWrapper}>
                    <label style={{marginRight:10, fontWeight:'bold', fontSize:'1rem'}}>Filter</label>
                    <Select value={filterCat} defaultActiveFirstOption defaultValue="all" style={{ width: 200 }} onChange={(v)=>filterHandler(v)}>
                        <Option value="all">Bütün məhsullar</Option>
                        {
                            categories.length&&categories.map(item=>(
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ))
                        }
                    </Select> 
                </div>
                
            </div>

            <section className={styles.products}>
                {
                    loading?<Loader/> : !admin? (
                        products.map((item,index)=>{
                            return (
                                <DoorCard door={item} key={index}/>
                            )
                        })
                    ): (
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
                    )
                }
            </section>
            
        </div>
    )
})

export default Products