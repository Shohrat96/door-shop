import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./WorksDone.module.scss";
import ImageModal from "./ImageModal/ImageModal";

const imgUrls = [
  "https://firebasestorage.googleapis.com/v0/b/door-project-d255b.appspot.com/o/roomDoors%2Fthumbnail%2F0c676ded3c69b580d404704ef6baaf51.jpg?alt=media&token=a2a59c2d-5110-4889-95ff-f346375cf706",
  "https://firebasestorage.googleapis.com/v0/b/door-project-d255b.appspot.com/o/roomDoors%2Fthumbnail%2F7df4b9308854b2aca30d776e3916dc1d.jpg?alt=media&token=81cade95-7986-4700-9834-e8db08f3f0f4",
  "https://firebasestorage.googleapis.com/v0/b/door-project-d255b.appspot.com/o/roomDoors%2Fthumbnail%2F24e5d4563a71e9ffb3bf9330d12f546a.png?alt=media&token=7c50e94f-07a4-44e7-86ee-e1352c363203",
  "https://firebasestorage.googleapis.com/v0/b/door-project-d255b.appspot.com/o/roomDoors%2Fthumbnail%2F0c676ded3c69b580d404704ef6baaf51.jpg?alt=media&token=a2a59c2d-5110-4889-95ff-f346375cf706",
  "https://firebasestorage.googleapis.com/v0/b/door-project-d255b.appspot.com/o/roomDoors%2Fthumbnail%2F2fa6642cff2ade382dc13f97d3cededa.png?alt=media&token=8285ce62-844e-4708-81ea-6edfd18bff15",
];

const WorksDone = ({ setSelectedImg }) => {
    const [imageSelected, setImageSelected]=useState(false);
    const closeHandle=(e)=>{
        if (e.target.classList.contains('ImageModal_backdrop__3mixp') || 
        (e.target.classList.contains('ImageModal_closeIcon__2hPBx'))
        )
        setImageSelected(false)
    }
  return (
    <div className={styles.container}>
        {
            imageSelected && <ImageModal closeHandle={closeHandle} url={imageSelected}/>
        }
      
      <h1 className={styles.title}>GÖRDÜYÜMÜZ İŞLƏR</h1>
      <div className={styles.imgGrid}>
        {imgUrls.map((url, idx) => (
          <motion.div
            className={styles.imgWrap}
            key={idx}
            layout
            whileHover={{ opacity: 1 }}
            s
            onClick={() => setImageSelected("https://firebasestorage.googleapis.com/v0/b/door-project-d255b.appspot.com/o/roomDoors%2F87f4dba08f63b63f3a611a199251d548-min.jpg?alt=media&token=8fc8c1bc-a487-4ef0-97df-90c95c6577f1")}
          >
            <motion.img
              src={url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorksDone;
