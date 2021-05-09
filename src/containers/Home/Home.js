import React from 'react';
import styles from './Home.module.scss'
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import { useHistory } from 'react-router-dom';
// import App from '../../firebase/firebaseConfig';

const Home=()=>{
    let history=useHistory();
    
    // const testFunc=()=>{
    //     const prodRef=App.db.ref('products');
    //     prodRef.once("value", function(snapshot){
    //         snapshot.forEach(child=>{
    //             if (child.val().category==2){
    //                 const imageName=child.val().image.split("%")[1].split("?")[0].slice(2);
    //                 const imageRef=App.storage.ref('roomDoors');
    //                 imageRef.child('thumbnail').child(imageName).getDownloadURL()
    //                 .then(url=>{
    //                     console.log("url: ",url);
    //                     child.ref.update(
    //                         {thumbnail:url}
    //                     )
    //                 })
    //             }

    //         })
    //     })
    //     prodRef.child('-MXDj4ybLdZPBdajPjJk').on('value',(val)=>{
    //         console.log("val: ",val.val());
    //         console.log('image: ',val.val().image.split("%")[1].split("?")[0].slice(2));
    //         const imageName=val.val().image.split("%")[1].split("?")[0].slice(2);
    //         const imageRef=App.storage.ref('portfolio');
    //         imageRef.child('thumbnail').child(imageName).getDownloadURL()
    //         .then(url=>{
    //             console.log("url: ",url);
    //             prodRef.child('-MXDj4ybLdZPBdajPjJk').update(
    //                 {thumbnail:url}
    //             )
    //         })
    //     })
    // }
    //  testFunc();
    return (
        <div className={styles.container}>
            <div className={styles.titleWrap}>
                <h1 className={styles.title}>
                    <span className={styles.titleMain}>DÜNYA QAPILARI</span>
                    <span className={styles.titleSub}>ETİBARINIZ UĞURUMUZDUR</span>
                </h1>
            </div>
            <div className={styles.btnContainer}>
               <CustomBtn
               onClick={()=>history.push("/products")}
               title="MƏHSULLARA KEÇ" 
               className={styles.catalogBtn}/>
            </div>
        </div>
    )
}

export default Home