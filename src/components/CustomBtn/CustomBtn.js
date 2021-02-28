import React from 'react';
import styles from './CustomBtn.module.scss';

const CustomBtn=(props)=>{
    const {title, style}=props;
    return (
        <button 
        className={styles.customBtn} 
        type="submit"
        style={{...style}}
        {...props}
        >
            {title}
        </button>
    )
}
export default CustomBtn