import React, { useState } from 'react';
import { Modal, Upload } from 'antd';
import camera from "../dist/webImages/camera.svg"
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const UploadProduct = ({ filelis, updatess,label }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        // if (newFileList.length > 5) {
        //     newFileList = newFileList.slice(0, 5);
        //     toast.error("You cannot upload more than 5 files. Only the first 5 files will be uploaded.");
        // }
        updatess(newFileList);
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
            className='w-full relative h-full'
        >
            <div className="TeamBoxinput mx-auto left-0 w-[2rem] h-[2rem] bg-[#C0CCE2] grid place-items-center rounded-full absolute right-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
                    <img src={camera} alt="camera" className='cursor-pointer' />
                </div>
        </button>



    );
    return (
        <>
            <div className='puplo'>
                {label && <div className="h3 mb-2 text-[1.2rem] font-MluvkaBold">{label}</div>}
                <Upload
                    action="https://jsonplaceholder.typicode.com/posts"
                    listType="picture-card"
                    fileList={filelis}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    multiple={true}
                >
                    {/* {filelis.length >= 5 ? null : uploadButton} */}
                    {    uploadButton}
                </Upload>
            </div>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default UploadProduct;