//import { Link } from 'react-router-dom'

import { useState } from "react";
import { useGetImageQuery } from "store/api/product";
import { signed_files_expiration } from "utils";

interface IProps {
  imageId: string;
  onClick: (value: string) => void;
}
const SignedThumbnail: React.FC<IProps> = ({ imageId, onClick }) => {
  const { data: photoData, isLoading: isPhotoLoading } = useGetImageQuery(
    imageId || "",
    {
      pollingInterval: signed_files_expiration,
    }
  );

  return (
    <>
      <img
        onClick={() => {
          onClick && onClick(imageId);
        }}
        key={imageId}
        src={photoData?.url}
        style={{ width: `20%`, cursor: "pointer" }}
      />
    </>
  );
};
export default SignedThumbnail;
