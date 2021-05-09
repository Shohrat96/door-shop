import React, { useState } from 'react';
import styles from './ImageModal.module.scss';

const ImageModal=({closeHandle, url})=>{

        return (
            <div className={styles.backdrop} onClick={closeHandle}>
                <div className={styles.mainContent}>
                    <div className={styles.closeIcon} onClick={closeHandle}>
                        X
                    </div>
                    <div className={styles.imgWrapper}>
                        <img src={url} alt="door pic full" />
                    </div>
                </div>
            </div>
        )

}

export default ImageModal