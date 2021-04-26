import React, { useState } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartFilled, PlayCircleOutlined } from '@ant-design/icons';
import styles from './DoorCard.module.scss';
import { addToFavAction, removeFromFavAction } from '../store/reducers/products';
import {connect} from 'react-redux';

const mapDispatchToProps=(dispatch)=>({
    addToFav:(product)=>dispatch(addToFavAction(product)),
    removeFromFav:(id)=>dispatch(removeFromFavAction(id))
})

const mapStateToProps=(state)=>({
    favorites:state.products.favorites
})

const DoorCard=connect(mapStateToProps, mapDispatchToProps)(({door, favorites, watchList, addToFav, removeFromFav, ...rest})=>{
    const toggleFavorite=(door)=>{
        
        if (favorites.some(item=>item.id===door.id)){
            console.log("found")
            removeFromFav(door.id)
        }else {
            console.log("not found")
            addToFav(door)
        }
    }
    const [overlay, showOverLay]=useState(false)
    const { Meta } = Card;
    return (
        <div className={styles.cardWrapper} {...rest} >
            <Link to={`products/${door.id}`}>
            <div 
            className={styles.cardContent} 
            // onMouseEnter={()=>showOverLay(true)}
            // onMouseLeave={()=>showOverLay(false)}
            >
            <Card
                hoverable
                style={{width:180, marginTop:5, overflow:'hidden' }}
                bodyStyle={{padding:"10px"}}
                cover={
                <img 
                alt="movie poster" 
                style={{height:320, width:180}}
                src={door.thumbnail?
                    door.thumbnail : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-200x200.jpg"} />
                    }
            >
            <Meta 
            title={door.title} 
            description={`${door.price} AZN`}            
            className={styles.metaContainer}
            
            />
            </Card>
            
            {
                overlay&&
                <div className={styles.overlay}>
                    <h3 className={styles.overlayInfo}>Details</h3>
                    <PlayCircleOutlined style={{width:'50pxx'}} />
                    <h3 className={styles.overlayInfo}>{door.title}</h3>
                </div>
            }
            </div>
            </Link> 
            <div className={styles.actionsWrapper}>
                <div className={styles.actions}>
                    <HeartFilled
                    onClick={()=>toggleFavorite(door)}
                    style={{
                        color:favorites.some(item=>item.id===door.id)?'red':'black',
                        cursor:"pointer"
                        }} 
                        />
                    {/* <PlusSquareFilled 
                    // onClick={()=>handleToggleWatchlist(movie)}
                    style={{
                        // color:watchList.some(item=>item.id===movie.id)?'red':'black',
                        cursor:"pointer"
                        }}
                        /> */}
                </div>
            </div>
        </div>
    )
})

export default DoorCard