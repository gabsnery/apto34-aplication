//import { Link } from 'react-router-dom'

import { useState } from "react";
import { useGetImageQuery } from "store/api/product";

interface IProps {
  imageId: string;
  onClick: (value:string)=>void;
}
const SignedThumbnail: React.FC<IProps> = ({
  imageId,onClick
}) => {
  const { data: photoData, isLoading: isPhotoLoading } = useGetImageQuery(
    imageId || ""
  );

  return (
    <>
      <img onClick={()=>{
        onClick && onClick(imageId)
      }} key={imageId} src={photoData?.url} style={{ width: `20%`,cursor:'pointer' }} />
    </>
  );
};
export default SignedThumbnail;
