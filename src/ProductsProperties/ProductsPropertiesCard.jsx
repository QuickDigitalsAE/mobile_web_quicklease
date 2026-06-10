import React, { useEffect } from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import useDelete from '../customHooks/useDelete';
import { toast } from 'react-toastify';





const ProductsPropertiesCard = ({data,alldata,deleted, permission}) => {
    const {id,property_image,property_title} = data
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
                    // apiMethodDelete(`properties/delete/${id}`)
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
            {/* {check("ProductProperties", "ProductProperties Delete") && <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>} */}
            <Link className="BlogsCardMain p-4 grid grid-cols-[auto,1fr] items-center gap-4 max-lg:grid-cols-1" to={`/products/properties/edit/${id}`}>
                <div className="BlogsCard__left max-lg:mb-4">
                   {property_image && <img src={property_image} className='w-[1.3rem] h-[1.3rem] object-cover rounded-3xl' alt={property_title} />}
                </div>
                <div className="BlogsCard__leftRight pr-8">
                    <div className="h2 text-[1.25rem]  font-MluvkaLight leading-[1.2] mb-2">{property_title}</div>
                </div>
            </Link>
        </div>
    )
}

export default ProductsPropertiesCard
