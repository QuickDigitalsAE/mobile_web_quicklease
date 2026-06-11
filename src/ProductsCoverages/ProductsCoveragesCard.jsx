import React, { useEffect } from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import useDelete from '../customHooks/useDelete';
import { toast } from 'react-toastify';

const ProductsCoveragesCard = ({data,alldata,deleted, permission}) => {
    const {id,title,tooltip,less_30_days_price,more_30_days_price} = data
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
                    // apiMethodDelete(`coverages/delete/${id}`)
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
 const check = (module, action) => permission?.[module]?.includes(action);

    return (
        <div className='BlogsCard my-2 relative shadow-custom border border-[#D4DEF1] rounded-3xl bg-white'>
            {/* {check("ProductCoverages", "ProductCoverages Delete") && <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>} */}
            <Link className="BlogsCardMain p-4 grid grid-cols-[auto,1fr] items-center gap-4 max-lg:grid-cols-1" to={`/products/coverages/edit/${id}`}>
               
                <div className="BlogsCard__leftRight pr-8">
                    <div className="h2 text-[1.1rem]  font-MluvkaLight leading-[1.2] mb-2">{title}</div>
                    <div className="h2 text-[1rem] ">{tooltip}</div>
                </div>
            </Link>
        </div>
    )
}

export default ProductsCoveragesCard
