/* eslint-disable */
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { showErrorMessage } from "Utils/MessageUtils";
import { COLORS } from "Constants/Colors";
import NoPhoto from "Assets/icons/NoPhoto";

const FormPhoto = styled(motion.img)`
  width: auto;
  height: 400px;
  object-fit: cover;
  position: relative;
  border: 1px solid ${(props) => (props.hasError ? COLORS.RED : "none")};
`;

function PhotoLoader({ name, photoUrl, hasError, photoLoadCallback }) {
  const photoFileInputRef = useRef();
  const [photo, setPhoto] = useState(photoUrl || NoPhoto);

  const onPhotoUpload = (e) => {
    if (
      ["image/png", "image/jpg", "image/jpeg"].includes(e.target.files[0].type)
    ) {
      photoLoadCallback(e.target.files[0]);
      setPhoto(URL.createObjectURL(e.target.files[0]));
    } else {
      showErrorMessage(
        "Для изображения продукта поддерживаются только форматы: png, jpg, jpeg"
      );
    }
  };

  return (
    <motion.Fragment
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormPhoto
        name={name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        src={photo}
        onClick={() => photoFileInputRef.current.click()}
        alt="Product photo"
        hasError={hasError}
      />
      <input
        type="file"
        ref={photoFileInputRef}
        multiple={false}
        onChange={onPhotoUpload}
        hidden
      />
    </motion.Fragment>
  );
}

export default PhotoLoader;
