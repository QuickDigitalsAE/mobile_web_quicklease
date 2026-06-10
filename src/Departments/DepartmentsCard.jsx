import React from 'react'
import { Link } from 'react-router-dom';
    import swal from 'sweetalert';

const DepartmentsCard = ({ data, modelDataUpdate, modelStatusUpdate, page }) => {
    const handleOpenModel = () => {
        modelStatusUpdate(true)
        modelDataUpdate({
        dtitle: "Department Title",
        discription: "Details"})
    }
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
          }
       
        });
      }
    return (
        <div className='dpartCard relative bg-[#fff] border border-[#D4DEF1] rounded-3xl shadow-custom p-4'>
            {page !== "home" &&
                <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
                    <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>}
            <Link to={"/departments/edit/1"} className='cursor-pointer'>
                <div className="dpartCard_ grid grid-cols-[4fr,6fr] gap-5 items-center">
                    <div className="dpartCard__img">
                        <img className='w-full h-full rounded-3xl object-cover' src={require("../dist/webImages/departments/1.png")} alt="" />
                    </div>
                    <div className="dpartCard__txt ">
                       { <div className={`h3 font-Mluvka  leading-[1.1] mb-1 `} style={{fontSize:`${page !== "home" ? "1.6rem" : "1.1rem"}`}}>Corporate Department</div>}

                        <div className="h4 font-Mluvka text-primary"><b className='font-MluvkaBold'>23</b> Lawyers</div>

                        <div className="dpartCardProfile flex mt-1">
                            {["2", "3", "4"].map((item, index) => {
                                return (
                                    <div className="dpartCardProfile-img" key={index}>
                                        <img className={`w-[2.4rem] h-[2.4rem] min-w-[2.4rem] min-h-[2.4rem] rounded-full object-cover border-2 border-[#fff] ${index !== 0 && "-ml-3"}`} src={require(`../dist/webImages/departments/${item}.png`)} alt={item} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {
                    page !== "home" &&
                    <p className='text-[.8rem] text-[#3C3E56] leading-[1.5] my-2'>It is well said that UAE is one of the globe’s prestigious corporate and commercial centres. UAE stands on a keen vision to offer supportive developments for the fast-paced corporate structures. It warmly welcomes expatriates from across the globe to start their entrepreneurial journeys.</p>
                }
            </Link>
        </div>
    )
}

export default DepartmentsCard
