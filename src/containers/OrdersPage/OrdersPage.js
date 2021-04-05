import React, { useEffect } from 'react'
import styles from './OrdersPage.module.scss';
import { setOrdersAction } from '../../store/reducers/orders';
import { connect } from 'react-redux';
import { Table, Space } from 'antd';
import App from '../../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
// const {Column}=Table;

const mapStateToProps=(state)=>({
    orders:state.orders.data
})

const OrdersPage = connect(mapStateToProps, {setOrdersAction})((props)=>{
    const {orders, setOrdersAction}=props;
    const columns=[
        {title:'Ad', dataIndex:'name',key:'name'},
        {title:'Nömrə', dataIndex:'phone',key:'phone'},
        {title:'Məhsul', dataIndex:'title',key:'title'},
        {
            title:'Məhsul Link',
            render:(text, record)=>{
                return (
                    <Link to={`/products/${record.productId}`}>Məhsul link</Link>
                )
            }
        },
        {title:'Qiymət', dataIndex:'price',key:'price'},
        {title:'Say', dataIndex:'count',key:'count'},
        {title:'Status', dataIndex:'status',key:'status'},
        {
            title:'Statusu dəyiş',
            render:(text, record)=>{
                return (
                    <Space size="middle">
                        <button className={styles.actionBtn}
                        onClick={()=>{
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
            }
        },

    ]
    const dataForTable=orders.map(data=>{

        const {name, count, phone}=data.order;
        const {title, price, id}=data.product;

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
                    Orders Dashboarddddd
                </h1>
            </div>
            <section className={styles.contentWrap}>
                <div className={styles.content}>
                    <Table 
                    columns={columns}
                    dataSource={dataForTable}  
                    expandable={{
                        expandedRowRender:record=><p style={{margin:0}}> <b>Sifariş ID: </b>{record.id}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable'
                    }}>
                    </Table>
                </div>
            </section>
        </div>
    )
})

export default OrdersPage
