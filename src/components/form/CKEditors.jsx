import React, { useRef, useEffect, useState } from "react";
import { Editor } from 'primereact/editor';
import axios from 'axios';
import config from "../../services/config.json";
import { getTokenSession } from "../../utils/common";

const CKEditors = ({ data, update, label,folder_name,page_type }) => {
  const [loading, setLoading] = useState(false)
  const apiurl = `${config.apiEndPoint}innerPages/uploadImage`;
  const editorRef = useRef(null);
    const authentication = getTokenSession();

const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    setLoading(true);
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder_name', folder_name);
    formData.append('page_type', page_type);
    formData.append('type', 'image');

    const fileName = file.name.split('.')[0]; // filename without extension

    const quill = editorRef.current.getQuill();
    const range = quill.getSelection();

    try {
      const response = await axios.post(apiurl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authentication}`,
        },
      });

      const imagePath = response.data?.data?.image_full_path;

      // Insert the image
      quill.insertEmbed(range.index, 'image', imagePath);

      // Delay to allow DOM to render, then add alt
         setTimeout(() => {
        const editorRoot = editorRef.current.getQuill().root; // .ql-editor
        const images = editorRoot.querySelectorAll(`img[src="${imagePath}"]`);
        images?.forEach((img) => {
          img.setAttribute('alt', fileName);
        });
      }, 50); // short timeout to wait for DOM update

    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };
};

  const color33 = [
    "#401A89",
    "#000000",
    "#e60000",
    "#ff9900",
    "#ffff00",
    "#008a00",
    "#0066cc",
    "#9933ff",
    "#facccc",
    "#ffebcc",
    "#ffffcc",
    "#cce8cc",
    "#cce0f5",
    "#ebd6ff",
    "#bbbbbb",
    "#f06666",
    "#ffc266",
    "#ffff66",
    "#66b966",
    "#66a3e0",
    "#c285ff",
    "#888888",
    "#a10000",
    "#b26b00",
    "#b2b200",
    "#006100",
    "#0047b2",
    "#6b24b2",
    "#444444",
    "#5c0000",
    "#663d00",
    "#666600",
    "#003700",
    "#002966",
    "transparent",
  ]

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [
          {
            color: color33,
          },
          {
            background: color33,
          },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
        ["table"], // Add table option
      ],
      handlers: {
        image: imageHandler,
      },
    },
    table: true, // Enable table module
  };


  return (
      <div className="relative">
         {
          loading
          &&
          <div role="status " className="absolute right-0 top-[-2rem]">
    <svg  className="w-6 h-6 ml-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>
        }
    <div className="mt-2 bg-white">
      <Editor
        ref={editorRef}
        value={data}
        onTextChange={(e) => update(e.htmlValue)}
        style={{ height: '320px' }}
        modules={modules}
      />
    </div>
    </div>
  );
};

export default CKEditors;
