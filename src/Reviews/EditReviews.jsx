import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import swal from "sweetalert";
import SubmitButton from '../components/SubmitButton';
import back from "../dist/webImages/back.svg";
import { Link, useNavigate, useParams } from 'react-router-dom';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import OneImageUpload from '../components/OneImageUpload';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';
import useGet from '../customHooks/useGet';
const EditReviews = ({permission}) => {
      const {id} = useParams();
        const [resget, apiMethodGet] = useGet()
      const navigate = useNavigate();
      const [imageLoader, setImageLoader] = useState(false)

      useEffect(() => {
        apiMethodGet(`googleReview/${id}`)
      }, []);

        const [datas, setDatas] = useState({
          "review_image": "",
        })

              useEffect(() => {
              if(resget.data) {
                setDatas({...datas,
                  "review_image" : resget.data?.data?.image})
              }
              }, [resget.data])




      const [res, apiMethod] = usePost();
  const requireFeild = ["rating","redirect_url"];
  const handleSubmit = async (values) => {
    if (imageLoader) {
      swal({
        title: "Wait a Few Second",
        icon: "error",
        dangerMode: true,
      });
    }
    else {
      let formdata = new FormData();
      let requireFeildSwal = {
        rating: "Rating",
        redirect_url: "Url",
      };
      let checkerRequried = [];
      for (const item in values) {
        if (requireFeild.includes(item) && !values[item]) {
          checkerRequried.push(requireFeildSwal[item]);
        }
      }

      formdata.append(`rating`, values["rating"]);
      formdata.append(`redirect_url`, values["redirect_url"]);
      formdata.append(`review_image`, datas?.review_value ?? "");
      if (checkerRequried.length > 0) {
        swal({
          title: "Required Fields are empty! Please fill and try again",
          text: checkerRequried.join(","),
          icon: "error",
          dangerMode: true,
        });
      }
      else {
        apiMethod(`googleReview/${id}`, formdata)
      }
    };
  }


    useEffect(() => {
      if (res.data) {
        const { status, message } = res?.data
        if (status === "false") {
          toast.error(message);
        }
        else {
          navigate("/reviews")
          toast.success(message);
        }
      }
    }, [res.data])


    if ( res.isLoading || !resget?.data?.data || !datas) return <SkeletonCreateEdit heading={"Edit Reviews"} />

        let initialValues = {
        rating: resget?.data?.data.rating,
        redirect_url: resget?.data?.data.redirect_url,
    }
const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='EditReviews pr-10 max-lg:pr-6'>
            <Link to={"/reviews"} className="back flex items-center mb-6 gap-2">
                <img src={back} className='w-[2rem]' alt="" />
                <span className='text-[1.4rem] font-MluvkaBold'>Edit Reviews</span>
            </Link>
            <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
                <div className={`ReviewsModel  transition-all duration-300  rounded-xl `}>

                    <div className=' overflow-auto modelBox'>
                        <Formik initialValues={initialValues}
                            onSubmit={handleSubmit}>
                            <Form name="myForm">
                                <div className="ReviewsBox p-5 px-12 rounded-xl">
                                      <div className="bg-[#EFF4FD] w-[20rem]">
                                 <OneImageUpload changeImage={setImageLoader} MainImage={datas?.review_image} Update={setDatas} sec_value={"review_value"} sec_image={"review_image"} folder_name={"review_images"} page_type={"reviews"} />
                                      </div>
                                    <div className='form'>
                                        <FormControl name="rating" placeholder="Enter Rating" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                                        <FormControl name="redirect_url" placeholder="Enter Url" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                                      
                                        <ul className='list gap-4  my-3 pb-6'>
                                            <li className=''>
                                                {check("Reviews", "Reviews Edit") &&
                                                    <SubmitButton
                                                        props={{
                                                            class: "btn bg-secondary text-white  uppercase   py-3 px-20 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                                            text: "Update",
                                                        }}
                                                        buttonLoading={res.isLoading}
                                                    />
                                                }
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReviews
