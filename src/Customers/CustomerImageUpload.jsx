import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import profileImg from '../dist/webImages/profile.webp'
import usePost from '../customHooks/usePost'

const CustomerImageUpload = ({ imagePath, previewImage, setImagePath, setPreviewImage, setImageLoader }) => {
  const [res, apiMethod] = usePost()

  const uploadFile = (file) => {
    if (!file) {
      return
    }

    if (!file.type?.includes('image')) {
      swal('Only use Image', '', 'warning')
      return
    }

    setImageLoader(true)
    setPreviewImage((window.URL || window.webkitURL).createObjectURL(file))

    const formdata = new FormData()
    formdata.append('image', file)
    formdata.append('folder_name', 'customer')
    formdata.append('page_type', 'customer')
    apiMethod('innerPages/uploadImage', formdata)
  }

  useEffect(() => {
    if (res?.data) {
      const { status, message, data } = res.data

      if (status === 'false') {
        toast.error(message)
        setImageLoader(false)
        return
      }

      setImagePath(data?.image_path || '')
      setImageLoader(false)
      toast.success(message || 'Image uploaded successfully')
    }
  }, [res.data, setImageLoader, setImagePath])

  useEffect(() => {
    if (res?.error?.response?.data?.message) {
      toast.error(res.error.response.data.message)
      setImageLoader(false)
    }
  }, [res.error, setImageLoader])

  return (
    <div className="customer-image-upload">
      <div className="flex items-center gap-4 max-md:flex-col max-md:items-start">
        <img
          src={previewImage || imagePath || profileImg}
          className="w-[5.5rem] h-[5.5rem] rounded-2xl object-cover border border-[#CFD5E2] bg-white"
          alt="Customer"
        />
        <div className="flex-1">
          <label className="inline-flex items-center gap-2 bg-[#d9dcf8] text-secondary px-5 py-3 rounded-full cursor-pointer font-MluvkaBold">
            <span>Choose Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadFile(e.target.files?.[0])}
            />
          </label>
          <p className="mt-2 text-[.85rem] text-[#7D8CA7]">
            We upload the image first to `innerPages/uploadImage`, then use the returned path in the customer request.
          </p>
          {imagePath ? (
            <p className="mt-1 text-[.8rem] text-[#7D8CA7] break-all">{imagePath}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CustomerImageUpload
