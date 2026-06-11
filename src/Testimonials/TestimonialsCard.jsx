import React, { useEffect } from 'react'
import swal from 'sweetalert';
import win from "../dist/webImages/win.svg"
import { Link } from 'react-router-dom';
import useDelete from '../customHooks/useDelete';
import { toast } from 'react-toastify';
import { StringConvert } from '../components/StringConvert';

const truncateText = (text, maxLength) => {
  if (text) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const TestimonialsCard = ({ data, alldata, deleted, permission }) => {

  const { id, client_name, client_email, client_phone, client_review, client_image } = data
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
          swal("Successfully Delete", "", "success");
          apiMethodDelete(`testimonials/delete/${id}`)
        }

      });
  }
  const [resDelete, apiMethodDelete] = useDelete()
  useEffect(() => {
    if (resDelete.data) {
      const { message } = resDelete.data
      const update = alldata.filter((item) => item.id !== id)
      deleted(update)
      toast.success(message);
    }
  }, [resDelete.data])

  const maxLength = 50;
  const truncatedText = truncateText(client_review, maxLength);
  const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='lawyerCard relative bg-[#fff] border border-[#D4DEF1] rounded-3xl shadow-custom p-4'>
      {/* {check("Testimonials", "Testimonial Delete") &&
        <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
          <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>} */}
      <Link to={`/testimonials/edit/${id}`} className='cursor-pointer relative'  >
        <div className="lawyerCard_ flex items-center gap-4">
          <div className="lawyerCard__img">
            <img className='w-[5rem] rounded-sm' src={client_image} alt="" />
          </div>
          <div className="lawyerCard__txt" >
            <div className="h2 text-[1.25rem] font-Mluvka leading-[1]">{client_name}</div>
            <p className="leading-[1] mt-2 text-primary text-[.8rem]">{client_email} | {client_phone}</p>
            <div className='text-[#393946] text-[.8rem] leading-[1.5] mb-4'>{StringConvert(truncatedText)}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TestimonialsCard
