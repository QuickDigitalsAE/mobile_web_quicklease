import React, { useContext, useEffect, useRef, useState } from "react";
import FormControl from "../components/form/FormControl";
import { Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate, useParams } from 'react-router-dom';
import back from "../dist/webImages/back.svg";
import SkeletonCreateEdits from "./SkeletonCreateEdits";
import usePost from "../customHooks/usePost";
import useFetch from "../customHooks/useFetch";
import swal from "sweetalert";
import { toast } from "react-toastify";


const RoleEdit = ({permission}) => {
  const {id} = useParams()
  const navigate = useNavigate();
  const { loading, data } = useFetch(`roles/allPermissions`)
  const { loading:loading2, data:data2 } = useFetch(`roles/edit/${id}`)
  const [selectAll, setSelectAll] = useState(false)
  const [datas, setDatas] = useState()
  useEffect(() => {
    if (data && data2) {
      let premisstion = data2?.data?.permissions
      const transformedData = Object.keys(data?.data).reduce((acc, key, index) => {
        acc[key] = {
          name: key,
          active: premisstion[key]?.length === data?.data[key]?.length,
          id: index,
          data: data?.data[key].map((item) => ({
            name: item.name,
            id: item.id,
            active: premisstion[key]?.includes(item?.name),
          })),
        };
        return acc;
      }, {});
      
      const allGroupsActive = Object.values(transformedData).every((group) => group.active);
      setSelectAll(allGroupsActive);
      setDatas(transformedData)
    }

  }, [data,data2])





  const handlePermissionAll = () => {
    const allSelect = !selectAll;
    setDatas((prevDatas) => {
      const updatedDatas = Object.keys(prevDatas).reduce((acc, key) => {
        acc[key] = {
          ...prevDatas[key],
          active: allSelect,
          data: prevDatas[key].data.map((item) => ({
            ...item,
            active: allSelect,
          })),
        };
        return acc;
      }, {});
      return updatedDatas;
    });
    setSelectAll(allSelect);
  };
  
  const handlePermission = ({ name, id, active, data }) => {
    setDatas((prevDatas) => {
      const updatedDatas = {
        ...prevDatas,
        [name]: {
          ...prevDatas[name],
          active, // Update parent's active state
          data: data, // Update all child items' active state
        },
      };
      const allGroupsActive = Object.values(updatedDatas).every((group) => group.active);
      setSelectAll(allGroupsActive);
      return updatedDatas;
    });

  };
  
  const handlePermission2 = ({ name, id, active }) => {
    setDatas((prevDatas) => {
      const updatedGroups = { ...prevDatas };
  
      for (const groupKey in updatedGroups) {
        const group = updatedGroups[groupKey];
        const updatedItems = group.data.map((item) =>
          item.id === id ? { ...item, active } : item
        );
        if (group.data.some((item) => item.id === id)) {
          const allChildrenActive = updatedItems.every((item) => item.active);
          updatedGroups[groupKey] = {
            ...group,
            data: updatedItems,
            active: allChildrenActive, // Update parent based on children
          };
        }
      }
      // Check if all parents are active for the "Select All" toggle
      const allGroupsActive = Object.values(updatedGroups).every((group) => group.active);
      setSelectAll(allGroupsActive);
  
      return updatedGroups;
    });
  };
  

  const [res, apiMethod] = usePost();
  const requireFeild = ["role_name"];
  const handleSubmit = async (values) => {
    let formdata = new FormData();
    let requireFeildSwal = {
      role_name: "Role Name",
    };
    formdata.append(`permissionAll`,selectAll === true ? 1 : 0);  
    let checkerRequried = [];
    for (const item in values) {
      if (requireFeild.includes(item) && values[item] === "") {
        checkerRequried.push(requireFeildSwal[item]);
      }
      formdata.append(item, values[item]);
    }

    for (const item in datas) {
      for (let index = 0; index < datas[item]?.data.length; index++) {
        if( datas[item]?.data[index].active) {
          formdata.append(`permissions[]`, datas[item]?.data[index].name);  
        }
      }
    }

    if (checkerRequried.length > 0) {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: checkerRequried.join(","),
        icon: "error",
        dangerMode: true,
      });
    }
 

    else {
      apiMethod(`roles/update/${id}`, formdata)
    }
  }
  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === false) {
        toast.error(message);
      }
      else {
        navigate("/role")
        toast.success(message);
      }
    }
  }, [res.data])


  if (loading  || loading2) return <SkeletonCreateEdits heading={"Edit Role"} />
  let initialValues = {
    role_name: data2?.data?.role?.name,
  };
 const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='createTeam pr-10 max-lg:pr-6'>
      <Link to={"/role"} className="back flex items-center mb-5 gap-2">
        <img src={back} className='w-[2rem]' alt="" />
        <span className='text-[1.4rem] font-MluvkaBold'>Create Role</span>
      </Link>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} >
        <Form name="myForm">
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8 max-lg:p-2'>
            <div className={`RoleCreate transition-all duration-300  bg-white rounded-xl`} >
              <div className="overflow-auto modelBox">
                <div className="TeamBox p-5 rounded-xl">
                  <div className="form mt-7">
                    <FormControl
                      name="role_name"
                      label={"Role Name"}
                      placeholder="Enter Role Name"
                      className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                      control="input"
                      type="text"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className='bg-[#EFF4FD] roleMain p-6 rounded-3xl mb-3 max-lg:p-2'>
            <div className="btn w-fit bg-primary px-7 rounded-full flex items-center gap-3 py-3 text-white cursor-pointer ml-auto" onClick={handlePermissionAll}>
              <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={`${selectAll ? "" : "hidden"}`} d="M6 7.3L8.76923 10L18 1" stroke={`${selectAll ? "#fff" : "#fff"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 8.5V14.3333C16 14.7754 15.8244 15.1993 15.5118 15.5118C15.1993 15.8244 14.7754 16 14.3333 16H2.66667C2.22464 16 1.80072 15.8244 1.48816 15.5118C1.17559 15.1993 1 14.7754 1 14.3333V2.66667C1 2.22464 1.17559 1.80072 1.48816 1.48816C1.80072 1.17559 2.22464 1 2.66667 1H11.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg><span>Select All</span></div>

            <div className="roleMainM grid grid-cols-3 gap-4 mt-4">
              {
                datas && Object.keys(datas).map((item, index) => {
                  return (
                    <div className="roleMainMBox py-5 px-5 bg-[#DEE5F2] rounded-3xl" key={index}>
                      <div className="roleMainMBoxt flex justify-between items-center">
                        <div className="roleMainMBoxl">
                          <span className="text-[#7D8CA7] uppercase">{item}</span>
                        </div>
                        <div className={`roleMainMBoxr ${datas[item].active && "active"}`} onClick={() =>
                          handlePermission({
                            name: datas[item].name,
                            id: datas[item].id,
                            active: !datas[item].active,
                            data: datas[item].data.map((child) => ({
                              ...child,
                              active: !datas[item].active,
                            })),
                          })
                        }
                        >
                          <svg className="cursor-pointer" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={`${datas[item].active ? "" : "hidden"}`} d="M6 7.3L8.76923 10L18 1" stroke={`${datas[item].active ? "#401a89" : "#706767"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 8.5V14.3333C16 14.7754 15.8244 15.1993 15.5118 15.5118C15.1993 15.8244 14.7754 16 14.3333 16H2.66667C2.22464 16 1.80072 15.8244 1.48816 15.5118C1.17559 15.1993 1 14.7754 1 14.3333V2.66667C1 2.22464 1.17559 1.80072 1.48816 1.48816C1.80072 1.17559 2.22464 1 2.66667 1H11.8333" stroke={`${datas[item].active ? "#401a89" : "#706767"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="roleMainMBoxb">
                        <ul className="list">
                          {
                            datas[item]?.data.map((item2) => {
                              const { name, id, active } = item2
                              return (
                                <li className={`bg-white cursor-pointer rounded-2xl py-4 px-6 flex items-center gap-2 my-3 roleMainMBoxbb ${active && "active"}`} key={id} onClick={() =>
                                  handlePermission2({
                                    name: item2.name,
                                    id: item2.id,
                                    active: !item2.active,
                                  })
                                }>
                                  <svg className="cursor-pointer" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={`${item2.active ? "" : "hidden"}`} d="M6 7.3L8.76923 10L18 1" stroke={`${item2.active ? "#401a89" : "#706767"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 8.5V14.3333C16 14.7754 15.8244 15.1993 15.5118 15.5118C15.1993 15.8244 14.7754 16 14.3333 16H2.66667C2.22464 16 1.80072 15.8244 1.48816 15.5118C1.17559 15.1993 1 14.7754 1 14.3333V2.66667C1 2.22464 1.17559 1.80072 1.48816 1.48816C1.80072 1.17559 2.22464 1 2.66667 1H11.8333" stroke={`${item2.active ? "#401a89" : "#706767"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span>{name}</span>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>

                    </div>
                  )
                })
              }

            </div>
          </div>
          {check("Roles", "Role Delete") && <SubmitButton
            props={{
              class:
                "btn bg-secondary text-white uppercase mt-6 ml-auto py-3 px-8 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
              text: "Update",
            }}
            buttonLoading={res.isLoading}
          />}
        </Form>
      </Formik>
    </div>
  )
}

export default RoleEdit
