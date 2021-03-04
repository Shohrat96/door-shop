import React, { useEffect } from 'react'
import styles from './OrdersPage.module.scss';
import { setOrdersAction } from '../../store/reducers/orders';
import { connect } from 'react-redux';
import { Table, Space } from 'antd';
import App from '../../firebase/firebaseConfig';

const {Column}=Table;

const mapStateToProps=(state)=>({
    orders:state.orders.data
})

const OrdersPage = connect(mapStateToProps, {setOrdersAction})((props)=>{
    const {orders, setOrdersAction}=props;
    const dataForTable=orders.map(data=>{

        const {name, count, phone}=data.order;
        const {title, price, id}=data.product;
        let {canceled, isComplete}=data;

        return {
            name,
            count,
            phone,
            title, 
            price, 
            productId:id, 
            id:data.id, 
            status:data.isComplete?"bitib":data.canceled?"ləğv edilib":"davam edir",
        }
    })
    console.log("orders: ",orders)
    useEffect(()=>{
        setOrdersAction()
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.titleWrap}>
                <h1>
                    Orders Dashboard
                </h1>
            </div>
            <section className={styles.contentWrap}>
                <div className={styles.content}>
                    <Table dataSource={dataForTable} expandable={{
                        expandedRowRender:record=><p style={{margin:0}}> <b>Sifariş ID: </b>{record.id}</p>,
                        
                    }}>
                        <Column title="Ad" dataIndex="name" key="name"/>
                        <Column title="Nömrə" dataIndex="phone" key="phone"/>
                        <Column title="Məhsul" dataIndex="title" key="title"/>
                        <Column title="Məhsul ID" dataIndex="productId" key="productId"/>
                        <Column title="Qiymət" dataIndex="price" key="price"/>
                        <Column title="Say" dataIndex="count" key="count"/>
                        <Column title="Status" dataIndex="status" key="status"/>
                        <Column
                        title="Status dəyiş"
                        render={(text, record)=>{
                            return (
                                <Space size="middle">
                                    <button className={styles.actionBtn}
                                    onClick={()=>{
                                        console.log("record:",record);
                                        let ref=App.db.ref("orders").child(record.id);
                                        ref.update({isComplete:true, canceled:false},err=>{
                                            if (err){
                                                console.log("error: ",err);
                                            }else {
                                                console.log("update success: ");
                                            }
                                        })
                                    }}
                                    >Bitir</button>
                                    <button className={styles.actionBtn}
                                    onClick={()=>{
                                        let ref=App.db.ref("orders").child(record.id);
                                        ref.update({canceled:true, isComplete:false},err=>{
                                            if (err){
                                                console.log("error: ",err)
                                            }else {
                                                console.log("update cancel success")
                                            }
                                        })
                                    }}
                                    >
                                        Ləğv et
                                    </button>
                                    <button className={styles.actionBtn}
                                    onClick={()=>{
                                        let ref=App.db.ref("orders").child(record.id);
                                        ref.update({canceled:false, isComplete:false},err=>{
                                            if (err){
                                                console.log("error: ",err)
                                            }else {
                                                console.log("update success")
                                            }
                                        })
                                    }}
                                    >
                                        Davam edir
                                    </button>
                                </Space>
                            )
                        }}
                        />
                    </Table>
                </div>
            </section>
        </div>
    )
})

export default OrdersPage
