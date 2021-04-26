import React from 'react';
import styles from './UsefulInfo.module.scss';
import sizeDoorImg from '../../assets/img/door-place-sizes.png'
import sizeEntryDoorImg from '../../assets/img/girisQapi.png'

const UsefulInfo=()=>{
    return (
        <div className={styles.container}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>
                    BİLMƏK FAYDALIDIR
                </h1>
                <div className={styles.additionalInfoWrap}>
                    <div className={styles.additionalInfo}>
                        <h2 className={styles.doorType}>Otaq qapıları</h2>
                        <div className={styles.infoContent}>
                            <div className={styles.imgWrapper}>
                                <img src={sizeDoorImg} alt="sizes-pic"/>
                            </div>
                        <h3>Qapının yeri üçün tələb olunan ölçülər</h3>
                        <table className={styles.sizeTable}>
                            <tr>
                                <th>En</th>
                                <th>Hündürlük</th>
                            </tr>
                            <tr>
                                <td>88-90sm</td>
                                <td>205-207sm</td>
                            </tr>
                        </table>
                        </div>
                    </div>
                    <div className={styles.additionalInfo}>
                        <h2 className={styles.doorType}>Giriş qapıları</h2>
                        <div className={styles.infoContent}>
                        <div className={styles.imgWrapper}>
                            <img src={sizeEntryDoorImg} alt="sizes-pic"/>
                        </div>
                        <h3>Qapının yeri üçün tələb olunan ölçülər</h3>
                        <table className={styles.sizeTable}>
                            <tr>
                                <th>En</th>
                                <th>Hündürlük</th>
                            </tr>
                            <tr>
                                <td>98-100sm</td>
                                <td>208-210sm</td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsefulInfo