import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { toast } from 'react-toastify';
import swal from "sweetalert";
import useGet from '../customHooks/useGet';
import usePost2 from '../customHooks/usePost2';

const EditProductsCoverages = ({permission}) => {
    const navigate = useNavigate();
    const {id} = useParams();
  const { mainLanguage } = useContext(MainLanguageContext);
  const [loading, setLoading] = useState(true)
  const [resget4, apiMethodGet4] = useGet()
  const [resget, apiMethodGet] = useGet()
  const [datas, setDatas] = useState()
  const [datas2, setDatas2] = useState()

  useEffect(() => {
    apiMethodGet4(`products/carsLocations/en`)
  }, []);

  useEffect(() => {
    if(resget4.data) {
         const locations = resget4.data?.data?.locations || {};
const a = Object.entries(locations).map(([key, value]) => ({
  location: value,
  less_30_days_price: "",
  more_30_days_price: ""
        }));

          setDatas2((prev) => ({
              ...prev,
              locations: a,
            }));
          
      
    }
  }, [resget4.data])
  
      useEffect(() => {
        apiMethodGet(`coverages/edit/${id}/${mainLanguage}`)
      }, [mainLanguage]);

      useEffect(() => {
        if (resget?.data?.data && datas2?.locations) {
          console.log()
          let a = resget?.data?.data
          if(resget?.data?.data?.prices_by_locations) {
            const updatedLocations = datas2.locations.map(item => {
              const updatedItem = resget.data.data.prices_by_locations.find(d => d.location === item.location);
              return updatedItem ? { ...item, ...updatedItem } : item;
            });
            a["locations"] = updatedLocations
            setDatas(a);
          }
          else {
            a["locations"] = datas2?.locations
            setDatas(a);
          }
        }
      }, [resget.data]);
      

  

  const handleCkChange = (e, type) => {
    setDatas(d => ({ ...d, [type]: e }));
  };

  const handleInputChange2 = (e, section, index) => {
    const { name, value } = e.target;
    setDatas(prevService => ({
        ...prevService,
        [section]: prevService[section].map((item, index2) =>
            index === index2 ? { ...item, [name]: value } : item
        )
    }));
}

  const [res, apiMethod] = usePost2();
  const requireFeild = ["title"];
  const handleSubmit = async (values) => {
      let requireFeildSwal = {
        title: "title",
      };

      let checkerRequried = [];
      for (const item in values) {
        if (requireFeild.includes(item) && !values[item]) {
          checkerRequried.push(requireFeildSwal[item]);
        }
      }

      let a = []
      for (let index = 0; index < datas?.locations.length; index++) {
       if(datas?.locations[index]?.less_30_days_price) {
        a.push(datas?.locations[index])
       }
        
      }

      const updateData =  {
        "coverage_status": values["coverage_status"].length > 0 ? 1 : 0,
        "recommended": values["recommended"].length > 0 ? 1 : 0,
        "field_required": values["field_required"].length > 0 ? 1 : 0,
        "checked_by_default": values["checked_by_default"].length > 0 ? 1 : 0,
        "countable_value": values["countable_value"].length > 0 ? 1 : 0,
        "per_day_price": values["per_day_price"].length > 0 ? 1 : 0,
        "address_is_required": values["address_is_required"].length > 0 ? 1 : 0,
        "vat_is_applicable": values["vat_is_applicable"].length > 0 ? 1 : 0,
        "less_30_days_price": values["less_30_days_price"],
        "more_30_days_price": values["more_30_days_price"],
        "translation": {
          "title": values["title"],
          "tooltip": values["tooltip"],
          "description": datas["description"]
        },
        "prices_by_locations": a
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
        apiMethod(`coverages/update/${id}/${mainLanguage}`, updateData)
      }

  };

  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === "false") {
        toast.error(message);
      }
      else {
        navigate(`/products/coverages`)
        toast.success(message);
      }
    }
  }, [res.data])

  if (resget.isLoading   || resget4.isLoading || !datas) return <SkeletonCreateEdit heading={"Edit Products Coverages"} />;

  let initialValues = {
    title: resget?.data?.data.title,
    tooltip: resget?.data?.data.tooltip,
    less_30_days_price: resget?.data?.data.less_30_days_price,
    more_30_days_price: resget?.data?.data.more_30_days_price,
    coverage_status: resget?.data?.data.coverage_status && [`${String(resget?.data?.data.coverage_status)}`],
    field_required: resget?.data?.data.field_required && [`${String(resget?.data?.data.field_required)}`],
    checked_by_default: resget?.data?.data.checked_by_default && [`${String(resget?.data?.data.checked_by_default)}`],
    countable_value: resget?.data?.data.countable_value && [`${String(resget?.data?.data.countable_value)}`],
    per_day_price: resget?.data?.data.per_day_price && [`${String(resget?.data?.data.per_day_price)}`],
    address_is_required: resget?.data?.data.address_is_required && [`${String(resget?.data?.data.address_is_required)}`],
    vat_is_applicable: resget?.data?.data.vat_is_applicable && [`${String(resget?.data?.data.vat_is_applicable)}`],
    recommended: resget?.data?.data.recommended && [`${String(resget?.data?.data.recommended)}`],
  }

  const { description } = datas;
 const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='newscreate  '>
<Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form name="myForm">
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
            <div className="grid grid-cols-2  gap-2">
            <FormControl name="title" label={"title"} placeholder="Enter title" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#ddd]" control="input2" />
            <FormControl name="tooltip" label={"tooltip"} placeholder="Enter tooltip" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#ddd]" control="input2" />
              </div>
              <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Description</div>
            <CKEditors label={"description"} folder_name={"description"} page_type={"products"} data={description} update={(text) => handleCkChange(text, "description")} />

            <div className="grid grid-cols-2  gap-2">
            <FormControl name="less_30_days_price" label={"less 30 days price"} placeholder="Enter less 30 days price" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#ddd]" control="input2" />
            <FormControl name="more_30_days_price" label={"more 30 days price"} placeholder="Enter more 30 days price" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#ddd]" control="input2" />
              </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">prices by locations</div>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(datas?.locations) && datas?.locations.map((item, index) => {
                    const {less_30_days_price,more_30_days_price,location} = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                        <div className="h2">{location}</div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between capitalize">Less 30 Days Price</label>
                        <input name='less_30_days_price' placeholder={`Enter ${location.replaceAll("_"," ")}`} className="outline-none w-full h-[3rem] px-5 rounded-xl" value={less_30_days_price} onChange={(e) => handleInputChange2(e, "locations", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between capitalize">More 30 Days Price</label>
                        <input name='more_30_days_price' placeholder={`Enter ${location.replaceAll("_"," ")}`} className="outline-none w-full h-[3rem] px-5 rounded-xl" value={more_30_days_price} onChange={(e) => handleInputChange2(e, "locations", index)} />
                      </div>
                    </div>
                  )
                })
              }
            </div>

<div className='flex flex-wrap gap-3'>

            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="coverage_status" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">Coverage Status</span>
              </label>
            </div>
            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="field_required" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">Field Required</span>
              </label>
            </div>
            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="checked_by_default" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">checked by default</span>
              </label>
            </div>
            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="countable_value" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">Countable Value</span>
              </label>
            </div>
            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="per_day_price" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">per day price</span>
              </label>
            </div>
            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="address_is_required" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">address is required</span>
              </label>
            </div>
            <div className="overflow-hidden relative pt-7 px-4">
              <label className="inline-flex items-center cursor-pointer">
                <Field value="1" type="checkbox" name="vat_is_applicable" className="sr-only peer" />
                <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">vat is applicable</span>
              </label>
            </div>
                 <div className="overflow-hidden relative pt-7 px-4">
                          <label className="inline-flex items-center cursor-pointer">
                            <Field value="1" type="checkbox" name="recommended" className="sr-only peer" />
                            <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900">Recommended</span>
                          </label>
                        </div>
            </div>
          </div>
          {check("ProductCoverages", "ProductCoverages Edit") && <SubmitButton
            props={{
              class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
              text: "Submit",
            }}
            buttonLoading={res.isLoading}
          />}
        </Form>
      </Formik>
    </div>
  )
}

export default EditProductsCoverages
