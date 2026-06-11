import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import plus from '../dist/webImages/plus.svg'
import useDelete from '../customHooks/useDelete'
import swal from 'sweetalert';
import useGet from '../customHooks/useGet';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { toast } from 'react-toastify';
import SkeletonRoleList from './SkeletonRoleList';

const RoleList = ({permission}) => {
    const { mainLanguage } = useContext(MainLanguageContext);  
    const [datas, setDatas] = useState()
    const [resget, apiMethodGet] = useGet()

    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`roles`);
        }
    }, [mainLanguage]);
    useEffect(() => {
        if(!resget.isLoading) {
           setDatas(resget?.data?.data)
        }
       
       }, [resget.data])

    const [resDelete, apiMethodDelete] = useDelete();
    const [delateId, setDelateId] = useState("")
    const handleDelete = (id) => {
        setDelateId(id)
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    // apiMethodDelete(`roles/remove/${id}`)
                    
                }
                
            });
        }
        useEffect(() => {
            if (resDelete.data) {
                const { status, message } = resDelete?.data
                if (status === false) {
                    toast.error(message);
                }
                else {
                swal("Successfully Delete", "", "success");
                const update = datas.filter((item) => item.id !== delateId)
                setDatas(update)
                toast.success(message);
            }
        }
      
      }, [resDelete.data])

    if (resget.isLoading) return <SkeletonRoleList />

     const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='services  '>
    <div className="servicesTop flex justify-between items-center mb-4">
        <h6 className='text-[1rem] mb-2 relative px-3 font-Mluvka'> Role</h6>
        {/* {check("Roles", "Role Add") && <Link to={"/role/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' >
            <img src={plus} alt="plus" />
            <span className='font-MluvkaBold text-secondary capitalize'>Add Role</span>
        </Link>} */}
    </div>
    <div className="servicesBottom grid grid-cols-4 gap-4 max-lg:grid-cols-1">
        {
           Array.isArray(datas) && datas.map((item) => {
                const { name, id } = item
                return (
                    <div className=' border-2 border-[#ddd] py-3 px-6 rounded-2xl relative' key={id}>
                        {check("Roles", "Role Delete") && <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[-1rem] right-[-1rem] grid place-items-center rounded-[.7rem] z-10' onClick={() => handleDelete(id)}>
                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>}
                        <Link to={`/role/edit/${id}`} className="servicesCard relative" >
                            <div className="servicesCard__Body">
                                <div className="h4 font-MluvkaBold text-[1.4rem] mt-3">{name}</div>
                            </div>
                        </Link>
                    </div>)

                
            })
        } 

    </div>
</div>
  )
}

export default RoleList