import React, { useEffect, useState } from "react";
import FormControl from "../components/form/FormControl";
import { Form, Formik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from 'react-router-dom';
import SkeletonCreateEdits from "./SkeletonCreateEdits";
import usePost from "../customHooks/usePost";
import useFetch from "../customHooks/useFetch";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { FiCheckSquare, FiLayers, FiShield, FiUsers } from "react-icons/fi";

const RoleCreate = () => {
  const navigate = useNavigate();
  const { loading, data } = useFetch(`roles/allPermissions`)
  const [selectAll, setSelectAll] = useState(false)
  const [datas, setDatas] = useState()
  useEffect(() => {
    if (data) {
      const transformedData = Object.keys(data?.data).reduce((acc, key, index) => {
        acc[key] = {
          name: key,
          active: false,
          id: index,
          data: data?.data[key].map((item) => ({
            name: item.name,
            id: item.id,
            active: false,
          })),
        };
        return acc;
      }, {});

      setDatas(transformedData)
    }

  }, [data])
  let initialValues = {
    role_name: "",
  };

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
    let checkerRequried = [];
    for (const item in values) {
      if (requireFeild.includes(item) && values[item] === "") {
        checkerRequried.push(requireFeildSwal[item]);
      }
      formdata.append(item, values[item]);
    }
    
    formdata.append(`permissionAll`,selectAll === true ? 1 : 0);  
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
      apiMethod(`roles/create`, formdata)
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

  if (loading) return <SkeletonCreateEdits heading={"Create Role"} />
  return (
    <div className='createTeam role-create-page'>
<Formik initialValues={initialValues} onSubmit={handleSubmit} >
        <Form name="myForm">
          <div className='role-create-page__shell'>
            <div className='RoleCreate role-create-page__hero transition-all duration-300 bg-white rounded-xl'>
              <div className="role-create-page__heroGrid">
                <aside className="role-create-page__aside">
                  <span className="role-create-page__kicker">Access Control</span>
                  <h2>Design a role with the right level of access</h2>
                  <p>
                    Name the role clearly, then choose the exact modules and actions this team member should control.
                  </p>
                  <div className="role-create-page__miniStats">
                    <article>
                      <FiShield />
                      <div>
                        <strong>{datas ? Object.keys(datas).length : 0}</strong>
                        <span>Permission groups</span>
                      </div>
                    </article>
                    <article>
                      <FiLayers />
                      <div>
                        <strong>
                          {datas
                            ? Object.values(datas).reduce((total, group) => total + group.data.length, 0)
                            : 0}
                        </strong>
                        <span>Available actions</span>
                      </div>
                    </article>
                  </div>
                  <div className="role-create-page__asideNote">
                    <strong>Quick Note</strong>
                    <span>Use focused role names like `Content Editor`, `Operations Lead`, or `Support Agent` for easier team management.</span>
                  </div>
                </aside>

                <section className='role-create-page__identity bg-[#EFF4FD] p-6 rounded-3xl mb-0 max-lg:p-2'>
                  <div className="role-create-page__sectionHead">
                    <h3>Role Details</h3>
                    <p>Set the display name that will represent this permission bundle across the admin.</p>
                  </div>
                  <div className={`RoleCreate transition-all duration-300 bg-white rounded-xl`} >
                    <div className="overflow-auto modelBox">
                      <div className="TeamBox p-5 rounded-xl">
                        <div className="form mt-7">
                          <FormControl
                            name="role_name"
                            label={"Role Name"}
                            placeholder="Enter role name"
                            className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-lg"
                            control="input"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className='bg-[#EFF4FD] mt-4 roleMain role-create-page__permissions p-6 rounded-3xl mb-3 max-lg:p-2'>
            <div className="role-create-page__permissionsTop">
              <div>
                <h3>Permission Matrix</h3>
                <p>
                  {Object.keys(datas || {}).length} groups,{" "}
                  {Object.values(datas || {}).reduce((total, group) => total + (group?.data?.filter((entry) => entry.active).length || 0), 0)} selected actions
                </p>
              </div>
              <button type="button" className="role-create-page__selectAll" onClick={handlePermissionAll}>
                <FiCheckSquare />
                <span>{selectAll ? "Clear All" : "Select All"}</span>
              </button>
            </div>

            <div className="roleMainM role-create-page__permissionGrid grid grid-cols-3 gap-4 mt-4">
              {
                datas && Object.keys(datas).map((item, index) => {
                  const activeCount = datas[item]?.data?.filter((entry) => entry.active).length ?? 0
                  return (
                    <div className="roleMainMBox role-create-page__permissionCard py-5 px-5 bg-[#DEE5F2] rounded-3xl" key={index}>
                      <div className="roleMainMBoxt role-create-page__permissionHead flex justify-between items-center">
                        <div className="roleMainMBoxl">
                          <span className="text-[#7D8CA7] uppercase">{item}</span>
                          <p>{activeCount}/{datas[item]?.data?.length ?? 0} selected</p>
                        </div>
                        <div className={`roleMainMBoxr role-create-page__groupToggle ${datas[item].active && "active"}`} onClick={() =>
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
                        <ul className="list role-create-page__permissionList">
                          {
                            datas[item]?.data.map((item2) => {
                              const { name, id, active } = item2
                              return (
                                <li className={`bg-white cursor-pointer rounded-2xl py-4 px-6 flex items-center gap-2 my-3 roleMainMBoxbb role-create-page__permissionItem ${active && "active"}`} key={id} onClick={() =>
                                  handlePermission2({
                                    name: item2.name,
                                    id: item2.id,
                                    active: !item2.active,
                                  })
                                }>
                                  <svg className="cursor-pointer role-create-page__permissionIcon" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div className="role-create-page__actions">
            <Link to="/role" className="role-create-page__cancel">
              Cancel
            </Link>
            <SubmitButton
              props={{
                class:
                  "role-create-page__submit btn bg-secondary text-white uppercase py-3 px-8 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                text: "Create Role",
              }}
              buttonLoading={res.isLoading}
            />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default RoleCreate
