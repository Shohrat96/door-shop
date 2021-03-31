import React from 'react';
import styles from './CustomBtn.module.scss';

const CustomBtn=({title,mode, className, ...rest})=>{
    let classNames;
    if (className){
        classNames=className.split(" ");
    }
    if (mode!=="link"){
        return (
            <button
            className={[`${styles.customBtn}`, classNames&&[...classNames]].join(" ")} 
            {...rest}
            >
                {title}
            </button>
        )
    }else {
        return (
            <a
            className={[`${styles.customBtn}`, classNames&&[...classNames]].join(" ")} 
            {...rest}
            >
                {title}
            </a>
        )
    }

}
export default CustomBtn