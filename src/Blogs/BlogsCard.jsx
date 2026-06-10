import React, { useEffect } from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import useDelete from '../customHooks/useDelete';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { StringConvert } from '../components/StringConvert';



const truncateText = (text, maxLength) => {
    if(text) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };


const BlogsCard = ({data,alldata,deleted,permission}) => {
    const {id,blog_image,blog_paragraph,blog_slug,blog_title,blog_schedule} = data

    // Function to replace specific special characters
    function replaceSpecialCharacters(str) {
      if (!str) return ''; // Handle undefined or null input
      return str
        .replace(/&amp;/g, '&') // Replace encoded ampersand
        .replace(/&lt;/g, '<') // Replace encoded less-than
        .replace(/&gt;/g, '>') // Replace encoded greater-than
        .replace(/&quot;/g, '"') // Replace encoded double quotes
        .replace(/&#39;/g, "'"); // Replace encoded single quotes
    }

    // Replace special characters in blog_paragraph
    const cleanedParagraph = replaceSpecialCharacters(blog_paragraph);
    const formattedDate = dayjs(blog_schedule).format('MMMM D, YYYY');
    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    // swal("Successfully Delete", "", "success");
                    // apiMethodDelete(`blogs/delete/${id}`)
                }

            });
    }
    const [resDelete, apiMethodDelete] = useDelete()
    useEffect(() => {
        if(resDelete.data) {
          const {message} = resDelete.data
          const update = alldata.filter((item) => item.id !== id)
          deleted(update)
          toast.success(message);
        }
      }, [resDelete.data])

      const maxLength = 200;
      const truncatedText = truncateText(cleanedParagraph, maxLength);
 const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='BlogsCard relative shadow-custom border border-[#D4DEF1] rounded-3xl bg-white'>
          {/* {check("Blogs", "Blogs Delete") &&  <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>} */}
            <Link className="BlogsCardMain p-4 grid grid-cols-[4fr,6fr] gap-4 max-lg:grid-cols-1" to={`/blogs/edit/${id}`}>
                <div className="BlogsCard__left max-lg:mb-4">
                    <img src={blog_image} className='w-full h-[10rem] object-cover rounded-3xl' alt="1.png" />
                </div>
                <div className="BlogsCard__leftRight pr-8">
                    <div className="h2 text-[1.25rem] capitalize font-MluvkaLight leading-[1.2] mb-2">{blog_title}</div>
                    <div className='text-[#393946] text-[.8rem] leading-[1.5] mb-4'>{StringConvert(truncatedText)}</div>
                    <ul className='list'>
                        <li className='text-primary flex justify-between items-center'><span className='font-MluvkaBold'>{formattedDate}</span></li>
                    </ul>
                </div>
            </Link>
        </div>
    )
}

export default BlogsCard
