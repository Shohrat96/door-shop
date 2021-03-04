import React from 'react'
import styles from './FavoritesPage.module.scss';
import { connect } from 'react-redux';
import DoorCard from '../../doorCard/DoorCard';


const mapStateToProps=(state)=>({
    favorites:state.products.favorites
})

const FavoritesPage=connect(mapStateToProps)(({favorites})=>{
    return (
        <div className={styles.container}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>
                    FAVORITES
                </h1>
            </div>
            <section className={styles.content}>
                {
                    favorites.length&&favorites.map((door, index)=>{
                        return (
                            <DoorCard door={door} key={index}/>
                        )
                    })
                }
            </section>
        </div>
    )
})

export default FavoritesPage