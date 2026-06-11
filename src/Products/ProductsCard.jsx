import React, { useEffect } from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import useDelete from '../customHooks/useDelete';
import { toast } from 'react-toastify';
import remove from "../dist/webImages/remove.png";
import check from "../dist/webImages/check.png";

const ProductsCard = ({ data, alldata, deleted, permission }) => {
    const { id, main_image, product_title, show_on_home, stock_status, promo_status, featured, vehicle_type,catalog_title } = data

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
                    // apiMethodDelete(`products/delete/${id}`)
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

 const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='ProductsCard relative shadow-custom border border-[#D4DEF1] rounded-3xl bg-white p-3'>
           {/* {check("Products", "Products Delete") &&  <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>} */}
            <Link className="ProductsCardMain p-4 gap-4 " to={`/products/edit/${id}`}>
                <div className="ProductsCard__left w-[80%] mx-auto max-lg:mb-4">
                    <img src={main_image} className='w-full  object-cover rounded-3xl' alt="1.png" />
                </div>
                <div className="ProductsCard__leftRight">
                    <div className="h2 text-[1.25rem] capitalize font-MluvkaBold text-primary leading-[1.2] mb-2 ">{product_title}</div>
                    <div className='grid'>
                    <div className=''><span className="text-[.9rem]"> <b>Catalog :</b></span>
                    <span className="text-primary font-MluvkaBold"> {catalog_title ? catalog_title : ""}</span></div>

                        <div className='flex gap-2 items-center justify-between border-b border-[#ddd] py-1'><span className="text-[.9rem]"> Featured :</span><span className="text-primary font-MluvkaBold"> {featured ? <img src={check} alt='' className='w-[15px] h-[15px] flex' /> : <img src={remove} alt='' className='w-[15px] h-[15px] flex' />}</span></div>
                        <div className='flex gap-2 items-center justify-between border-b border-[#ddd] py-1'><span className="text-[.9rem]"> Promo :</span><span className="text-primary font-MluvkaBold"> {promo_status ? <img src={check} alt='' className='w-[15px] h-[15px] flex' /> : <img src={remove} alt='' className='w-[15px] h-[15px] flex' />}</span></div>
                        <div className='flex gap-2 items-center justify-between border-b border-[#ddd] py-1'><span className="text-[.9rem]"> In Stock :</span><span className="text-primary font-MluvkaBold"> {stock_status ? <img src={check} alt='' className='w-[15px] h-[15px] flex' /> : <img src={remove} alt='' className='w-[15px] h-[15px] flex' />}</span></div>
                        <div className='flex gap-2 items-center justify-between border-b border-[#ddd] py-1'><span className="text-[.9rem]"> In Home :</span><span className="text-primary font-MluvkaBold"> {show_on_home ? <img src={check} alt='' className='w-[15px] h-[15px] flex' /> : <img src={remove} alt='' className='w-[15px] h-[15px] flex' />}</span></div>
                        <div className='flex gap-2 items-center justify-between'><span className="text-[.9rem]"> Vehicle Type :</span>
                        <span className="text-primary font-MluvkaBold"> {vehicle_type ? vehicle_type : ""}</span></div>
                       
                    </div>
                </div>

            </Link>
        </div>
    )
}

export default ProductsCard
