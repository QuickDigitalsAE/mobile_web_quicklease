import React, { useEffect, useState } from 'react'
import usePost from '../../customHooks/usePost';
import profile from "../../dist/webImages/profile.webp"
import camera from "../../dist/webImages/camera.svg"
import { toast } from 'react-toastify';
import swal from "sweetalert";

const FileImage = ({folder_name,page_type,typeValue,typeImage,updateData,allData}) => {
      const [res2, apiMethod2] = usePost();
      const [imageLoader, setImageLoader] = useState(false)
      const handleFileUpload = (e, type, value) => {
        setImageLoader(true)
        let formdata = new FormData();
        const file = e.target.files[0];
        if (file) {
          let path = (window.URL || window.webkitURL).createObjectURL(file);
          updateData((prevState) => ({
            ...prevState, [type]: path,
          }));
          formdata.append(`image`, file);
          formdata.append(`folder_name`, folder_name);
          formdata.append(`page_type`, page_type);
          apiMethod2(`innerPages/uploadImage`, formdata)
    
        }
      }

      const handleDrop = (e, type, value) => {
        e.preventDefault();
        let formdata = new FormData();
        if (e.dataTransfer.files[0] && e.dataTransfer.files[0]?.type?.includes("image")) {
          let path = (window.URL || window.webkitURL).createObjectURL(e.dataTransfer.files[0]);
          updateData((prevState) => ({
            ...prevState, [type]: path
          }));
          formdata.append(`image`, e.dataTransfer.files[0]);
          formdata.append(`folder_name`, folder_name);
          formdata.append(`page_type`, page_type);
          apiMethod2(`innerPages/uploadImage`, formdata)
        }
        else {
          swal("Only use Image", "", "warning");
        }
      };
    

      useEffect(() => {
        if (res2.data) {
          const { status, message, data } = res2?.data
          if (status === "false") {
            toast.error(message);
          }
          else {
            updateData((prevState) => ({
              ...prevState, ["typeValue"]: data?.image_path
            }));
          }
        }
      }, [res2.data])

  return (
   
    <div className='mt-4'>
{typeImage &&    <div>
      <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image </label>
      <div className=' h-[10rem] relative' onDrop={(e) => handleDrop(e, `blog_image`, "blog_value")}>
        {allData?.blog_image ?
          <img src={allData?.blog_image || profile} className='w-full h-full rounded-3xl object-cover ' alt="" />
          :
          <div className='w-full h-full  rounded-3xl object-cover  bg-white'></div>
        }
        <div className="TeamBoxinput w-[3rem] h-[3rem] bg-[#C0CCE2] grid  place-items-center rounded-full absolute mx-auto right-0 left-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
          <input type="file" onChange={(e) => handleFileUpload(e, "blog_image", "blog_value")} className='absolute inset-0 opacity-0 cursor-pointer' />
          <img src={camera} alt="camera" className='cursor-pointer w-full p-3' />
        </div>
      </div>
    </div>}
  </div>
  )
}

export default FileImage