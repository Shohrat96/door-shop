import React, { useState } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartFilled, PlusSquareFilled, PlayCircleOutlined } from '@ant-design/icons';
import styles from './DoorCard.module.scss';

const DoorCard=({door, favorites, watchList})=>{
    const [overlay, showOverLay]=useState(false)
    const { Meta } = Card;
    console.log(door);
    return (
        <div className={styles.cardWrapper}>
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
                src={door.image?
                    door.image : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-200x200.jpg"} />
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
                    // onClick={()=>handleToggleFavorite(movie)}
                    // style={{
                    //     color:favorites.some(item=>item.id===movie.id)?'red':'black',
                    //     cursor:"pointer"
                    //     }} 
                        />
                    <PlusSquareFilled 
                    // onClick={()=>handleToggleWatchlist(movie)}
                    // style={{
                    //     color:watchList.some(item=>item.id===movie.id)?'red':'black',
                    //     cursor:"pointer"
                    //     }}
                        />
                </div>
            </div>
        </div>
    )
}

export default DoorCard