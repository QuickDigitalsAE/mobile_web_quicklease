import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import { Link, useNavigate } from 'react-router-dom';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { toast } from 'react-toastify';
import swal from "sweetalert";
import useGet from '../customHooks/useGet';
import { Select } from 'antd';
import OneImageUploadMultiple2 from '../components/OneImageUploadMultiple2';
import plus from '../dist/webImages/plus.svg'
import OneImageUpload from '../components/OneImageUpload';
import usePost2 from '../customHooks/usePost2';
import DropDown from "../dist/webImages/dropdown.svg"
import { MainUserDataContext } from '../context/MainUserDataContext';

const CreateProducts = () => {
  const navigate = useNavigate();
  const [imageLoader, setImageLoader] = useState(false)
  const { mainLanguage } = useContext(MainLanguageContext);
  const { userdata } = useContext(MainUserDataContext);
  const [dropDownState, setDropDownState] = useState(true)
  const [resget2, apiMethodGet2] = useGet()
  const [resget3, apiMethodGet3] = useGet()
  const [resget4, apiMethodGet4] = useGet()
  const [resget5, apiMethodGet5] = useGet()
  const [propertiesList, setPropertiesList] = useState("")
  const [propertiesList2, setPropertiesList2] = useState("")
  const [coverages, setCoverages] = useState("")
  const [catlogsList, setCatlogsList] = useState("")
  const [catlogsList2, setCatlogsList2] = useState("")
  const [datas, setDatas] = useState({
    "car_images": [{
      "image_path": "",
      "image_full_path": "",
    }],
    "flexible_cars_monthly_prices":[{
      months:"",
      value:"",
    }],
    "personal_cars_monthly_prices":[{
      months:"",
      value:"",
    }],
  })
 const [parent_id, setParent_id] = useState("")
   const [slugs, setSlugs] = useState({
                    "slugs":"",
                    "all_slugs":"",
                  })

  useEffect(() => {
    apiMethodGet3(`properties/frontendList/en`)
  }, []);
  useEffect(() => {
    apiMethodGet2(`catalogs/dropdownList/en`)
  }, []);
  useEffect(() => {
    apiMethodGet4(`products/carsLocations/en`)
  }, []);
  useEffect(() => {
    apiMethodGet5(`coverages/dropdownList/en`)
  }, []);

  useEffect(() => {   
if(resget5?.data) {
  setCoverages(resget5?.data?.data)
}
   
}, [resget5.data]);

  useEffect(() => {
    if (resget3.data) {
      setPropertiesList(resget3.data?.data);

      // Initial state ko API se set karna
      const initialData = {};
      Object.keys(resget3.data?.data || {}).forEach((category) => {
        initialData[category] = resget3.data.data[category].map((item) => {
          if (item?.property_field_type === "selector") {
            return {
              property_id: item.id,
              property_value: item?.property_values[0],
            }
          }
          else {
            return {
              property_id: item.id,
              property_value: "",
            }
          }
        });
      });

      setPropertiesList2(initialData);
    }
  }, [resget3.data]);

  const handleSlugUpdate = (e) => {
    setSlugs({
        ...slugs,
        "slugs":e.target.value,
    })
}

const handleParent = (e) => {

  const value = e.target.value;
    
  // If no parent selected
  if (value === "") {
    setParent_id(null);
    setSlugs((prev) => ({
      ...prev,
      all_slugs: ``,
    }));
    return;
  }

  const selectedId = parseInt(e.target.value);
  setParent_id(selectedId);

  // Find the selected item (either parent or child)
  let selectedItem = null;
  let foundParent = catlogsList.find((parent) => {
    if (parent.id === selectedId) {
      selectedItem = parent;
      return true;
    }

    const child = parent.children?.find((c) => c.id === selectedId);
    if (child) {
      selectedItem = child;
      return true;
    }

    return false;
  });

  // Determine the correct slug path
  let all_slugs = '';
  if (selectedItem) {
   all_slugs = `${selectedItem.slug}`;
    }

  // Update state
  setSlugs((prev) => ({
    ...prev,
    all_slugs,
  }));
};

  const handleChange3 = (category, property_id, value) => {
    setPropertiesList2((prev) => ({
      ...prev,
      [category]: prev[category]
        ? prev[category].map((item) =>
          item.property_id === property_id
            ? { ...item, property_value: value }
            : item
        )
        : [{ property_id, property_value: value }],
    }));
  };
  const handleChange4 = (category, property_id, value, old) => {
    setPropertiesList2((prev) => ({
      ...prev,
      [category]: prev[category]
        ? prev[category].map((item) =>
          item.property_id === property_id
            ? {
              ...item,
              property_value: old.includes(value)
                ? old.filter((v) => v !== value) // Uncheck karein to remove
                : [...old, value], // Check karein to add
            }
            : item
        )
        : [{ property_id, property_value: [value] }],
    }));
  };
  const handleChangeCoverages = (coverage_id, value, type) => {
    setCoverages(prevService =>   prevService.map((item) => item?.coverage_id === coverage_id ? { ...item, [type]: value } : item));
  };

  useEffect(() => {
    if (resget2.data) {
      const data = resget2.data.data;
      setCatlogsList(data);

      const options = data?.flatMap(item => {
        const mainOption = {
          label: item.catalog_title,
          value: item.id,
        };

        const subOptions = item.children?.map(subItem => ({
          label: `â€” ${subItem.catalog_title}`,
          value: subItem.id,
        })) || [];

        return [mainOption, ...subOptions];
      });
      setCatlogsList2(options)
    }
  }, [resget2.data]);

  const handleCkChange = (e, type) => {
    setDatas(d => ({ ...d, [type]: e }));
  };

  const handletype = (e, type) => {
    setDatas((d) => ({ ...d, [type]: e }));
  };

  const handleExtraClick = () => {
    setDropDownState(!dropDownState)
  }

  const handleChange = (e, type) => {
    setDatas((d) => ({ ...d, [type]: e }));
  };

  const handleSectionAdd2 = (sectionKey, fields) => {
    setDatas((prevState) => ({
      ...prevState,
      [sectionKey]: [...(prevState[sectionKey] || []), ""],
    }));
  };

  const handleDelete = (section, index) => {
    setDatas(prevService => ({
      ...prevService,
      [section]: prevService[section].filter((item, index2) => index !== index2)
    }));
  }

  let initialValues = {
    meta_title: "",
    meta_description: "",
    product_title: "",
    heading_one: "",
    car_locations: "",
    daily_price: "",
    old_daily_price: "",
    weekly_price: "",
    old_weekly_price: "",
    monthly_price: "",
    old_monthly_price: "",
    cars_monthly_price: "",
    cars_yearly_price: "",
    model: "",
    year: "",
    installment_per_month: "",
    installment_per_month_with_down: "",
    installment_per_month_final_term: "",
    down_payment: "",
    promo_status: "",
    featured: "",
    stock_status:  ["1"],
    show_documents: ["1"],
    book_now_button:["1"],
    product_status: ["1"],
    show_on_home: "",
    pay_now_discount: 0,
    security_deposit: '',
    security_deposit_waiver_daily: '',
    security_deposit_waiver_monthly: '',
  };

  const handleSectionAdd = (sectionKey, fields) => {
    const newEntry = Object.fromEntries(fields.map((field) => [field, ""]));

    setDatas((prevState) => ({
      ...prevState,
      [sectionKey]: [...(prevState[sectionKey] || []), newEntry],
    }));
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
  const requireFeild = ["meta_title", "meta_description", "slug","model","year"];
  const handleSubmit = async (values) => {
    if (imageLoader) {
      swal({
        title: "Wait a Few Second",
        icon: "error",
        dangerMode: true,
      });
    }
    else {
      let requireFeildSwal = {
        meta_title: "Meta title",
        meta_description: "Meta Description",
        model: "model",
        year: "year",
      };
      let checkerRequried = [];
      for (const item in values) {
        if (requireFeild.includes(item) && !values[item]) {
          checkerRequried.push(requireFeildSwal[item]);
        }
      }
      if(!datas?.main_image_value) {
        checkerRequried.push("Main Image");
      }
      if(!datas?.vehicle_type) {
        checkerRequried.push("vehicle_type");
      }
      if(!parent_id) {
        checkerRequried.push("catalog_id");
      }
      if(slugs.slugs) {

      }
      else {
          checkerRequried.push("slug Required");
      }
            if (datas?.specification_auto) {

      }
      else {
        checkerRequried.push("specification Auto Required");
      }

      let carImage = []
      for (let index = 0; index < datas?.car_images.length; index++) {
        carImage.push(datas?.car_images[index]?.image_path_value ?? "")

      }
      let coveragesList = coverages.filter((item) => item?.less_30_days_price)
      const formatMonthlyPrices = (prices) => 
        prices.reduce((acc, item) => {
          if (item.value !== null && item.value !== undefined && item.value !== '') {
            acc[`${item.months}_months`] = item.value;
          }
          return acc;
        }, {});
      const flexible_cars_monthly = formatMonthlyPrices(datas.flexible_cars_monthly_prices);
      const personal_cars_monthly = formatMonthlyPrices(datas.personal_cars_monthly_prices);
      // ${path.join("/")}/ 
      const updateData = {
        "slug": slugs.all_slugs ? `${slugs.all_slugs}/${slugs.slugs}` : slugs.slugs,
        "catalog_id": parent_id ?? "",
        "stock_status": values["stock_status"].length > 0 ? 1 : 0,
        "show_documents": values["show_documents"].length > 0 ? 1 : 0,
        "book_now_button": values["book_now_button"].length > 0 ? 1 : 0,
        "product_status": values["product_status"].length > 0 ? 1 : 0,
        "show_on_home": values["show_on_home"].length > 0 ? 1 : 0,
        "promo_status": values["promo_status"].length > 0 ? 1 : 0,
        "featured": values["featured"].length > 0 ? 1 : 0,
        "specification_auto": datas?.specification_auto,
        "vehicle_type": datas?.vehicle_type,
        "car_locations": datas?.car_locations,
        "additional_catalog_ids": datas?.additional_catalog_ids ? datas?.additional_catalog_ids : [],
        "main_image": datas?.main_image_value ?? "",
        "model": values["model"],
        "year": values["year"],
        "daily_price": values["daily_price"],
        "old_daily_price": values["old_daily_price"],
        "weekly_price": values["weekly_price"],
        "old_weekly_price": values["old_weekly_price"],
        "monthly_price": values["monthly_price"],
        "old_monthly_price": values["old_monthly_price"],
        "cars_monthly_price": values["cars_monthly_price"],
        "cars_yearly_price": values["cars_yearly_price"],
        "installment_per_month": values["installment_per_month"],
        "installment_per_month_with_down": values["installment_per_month_with_down"],
        "installment_per_month_final_term": values["installment_per_month_final_term"],
        "down_payment": values["down_payment"],
        "security_deposit": values["security_deposit"] ?? 0,
          "security_deposit_waiver_daily": values["security_deposit_waiver_daily"] ?? 0,
          "security_deposit_waiver_monthly": values["security_deposit_waiver_monthly"] ?? 0,
          pay_now_discount: 0,
        car_images: carImage,
        properties: propertiesList2,
         coverages: coveragesList,
         flexible_cars_monthly_prices: flexible_cars_monthly,
         personal_cars_monthly_prices: personal_cars_monthly,
        "translation": {
          "meta_title": values["meta_title"],
          "meta_description": values["meta_description"],
          "product_title": values["product_title"],
          "heading_one": values["heading_one"],
          "description": datas["description"],
          "short_description": datas["short_description"],
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
        apiMethod(`products/create/en`, updateData)
      }
    }
  };

     useEffect(() => {
         if (res.data) {
             const { status, message } = res?.data;
             if (status === "false") {
                 toast.error(message);
             } else {
                 navigate(`/products/edit/${res?.data?.data?.product_id}`)
                 toast.success(message);
             }
         }
     }, [res.data]);

  if (resget2.isLoading || resget3.isLoading || resget4.isLoading) return <SkeletonCreateEdit heading={"Create Products"} />;
  const { description, car_images,short_description } = datas;

  return (
    <div className='newscreate product-create-page'>
      <div className="product-create-page__hero">
        <div>
          <span className="product-create-page__eyebrow">Inventory Setup</span>
          <h2>Create a product with cleaner structure and faster scanning</h2>
          <p>
            Add product details, media, pricing, properties, and booking settings from one modern workspace.
          </p>
        </div>
      </div>
<Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form name="myForm" className="product-create-page__form">
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
          <div className="">
          <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Slug - {slugs.all_slugs}</div>
          <input value={slugs?.slugs ?? ""} onChange={handleSlugUpdate} name="slug" label={"Slug"} placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[red]" control="input2" />
          </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> Catalog</div>
                   <select value={parent_id ?? ""}  onChange={handleParent} name="catalog_id" className="outline-none w-full h-[3rem] px-5 rounded-xl" >
                      <option value="">---select Parent ---</option>
                      {Array.isArray(catlogsList) &&
                        catlogsList.map((item) => {
                         const { id, catalog_title, children } = item;
                          return (
                          <React.Fragment key={id}>
                            <option value={id}>{catalog_title}</option>
                              {Array.isArray(children) &&
                                children.map((item2) => (
                                  <option key={item2.id} value={item2.id}>
                                     â€” {item2.catalog_title}
                                  </option>
                                  ))}
                                  </React.Fragment>
                                  );
                                  })}
                    </select>
            
              </div>
              <div>
                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Class Auto</div>
                <select value={datas?.vehicle_type} onChange={(e) => handletype(e.target.value, "vehicle_type")} name="vehicle_type" className="outline-none w-full h-[3rem] px-5 rounded-xl"  >
                  <option value={""}>---select Class Auto ---</option>
                  <option value={"economy"}>Economy</option>
                  <option value={"suv"}>SUV</option>
                  <option value={"Luxury"}>Luxury</option>
                  <option value={"Midsize"}>Midsize</option>
                  <option value={"crossovers"}>Crossovers</option>
                  <option value={"commercial"}>Commercial</option>
                </select>
              </div>
              <div className='antdheight'>
                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Location</div>
                <Select
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(e) => handleChange(e, "car_locations")}
                  style={{
                    width: '100%',
                  }}
                  options={resget4?.data?.data && Object.entries(resget4?.data?.data?.locations).map(([key, value]) => ({
                    label: value,
                    value: key,
                  }))}
                />
              </div>
              <div className='antdheight'>
                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Additional Catalogs</div>
                <Select
                 showSearch
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(e) => handleChange(e, "additional_catalog_ids")}
                  style={{
                    width: '100%',
                  }}
                  options={catlogsList2}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </div>
            </div>
           
              <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

            <div className="grid  gap-2">
              <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
            </div>

        

          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                    
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Products</div>
            <div className='grid grid-cols-2 gap-3'>
            <FormControl name="product_title" label={"Product Title "} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

            <FormControl name="heading_one" label={"Heading {h1}"} placeholder="Enter Heading One" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>

            <br />

            <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Description</div>
            <CKEditors label={"Description"} folder_name={"products_images"} page_type={"products"} data={description} update={(text) => handleCkChange(text, "description")} />
            <br />
            <br />
            <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Product Short Description</div>
            <CKEditors label={"Description"} folder_name={"products_images"} page_type={"products"} data={short_description} update={(text) => handleCkChange(text, "short_description")} />

            <div className='mt-4'>
              <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Main Image </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.main_image} Update={setDatas} sec_value={"main_image_value"} sec_image={"main_image"} folder_name={"products_images"} page_type={"products"} />
              </div>
            </div>

            <div className='mt-4'>
              <div>
                <div className='flex justify-between'>
                  <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Car Images</div>
                  <Link className='product-create-page__addLink bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd2("car_images", [])} >
                    <img src={plus} alt="plus" />
                    <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                  </Link>
                </div>
                <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                  {
                    Array.isArray(car_images) && car_images.map((item, index) => {
                      const { image_path, image_path_value, image_full_path } = item
                      return (
                        <div className='relative' key={index}>
                          <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                            onClick={() => handleDelete("car_images", index)}  >
                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Car Image</label>
                          {
                            <OneImageUploadMultiple2 changeImage={setImageLoader} indexValue={index} sec_value={"image_path_value"} sec_image={"image_path"} section={"car_images"} MainImage={image_path_value ?? image_full_path} Update={setDatas} folder_name={"products_images"} page_type={"products"} />
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Price Monthly</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="monthly_price" label={"Price"} placeholder="Enter Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="old_monthly_price" label={"Old Price"} placeholder="Enter Old Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Price Weekly</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="weekly_price" label={"Price"} placeholder="Enter Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="old_weekly_price" label={"Old Price"} placeholder="Enter Old Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Price Daily</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="daily_price" label={"Price"} placeholder="Enter Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="old_daily_price" label={"Old Price"} placeholder="Enter Old Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> Flexible Rentals</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="cars_monthly_price" label={"Monthly Price"} placeholder="Enter Monthly Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="cars_yearly_price" label={"Yearly Price"} placeholder="Enter Yearly Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="model" label={"Model"} placeholder="Enter Model" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="year" label={"Yearly"} placeholder="Enter Yearly" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="installment_per_month" label={"Installment Per Month"} placeholder="Enter Installment Per Month" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="installment_per_month_with_down" label={"Installment Per Month With Down"} placeholder="Enter Installment Per Month With Down" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="installment_per_month_final_term" label={"Installment Per Month Final Term"} placeholder="Enter Installment Per Month Final Term" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="down_payment" label={"Down Payment"} placeholder="Enter Down Payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>
         <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Security Deposit</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="security_deposit" label={"Security Deposit"} placeholder="Enter Security Deposit" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Security Deposit waiver</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="security_deposit_waiver_daily" label={"security deposit waiver daily"} placeholder="Enter security deposit waiver daily" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="security_deposit_waiver_monthly" label={"security deposit waiver monthly"} placeholder="Enter security deposit waiver monthly" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="pay_now_discount" label={"Pay Now Discount"} placeholder="Enter Pay Now Discount" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Flexible</div>
              <Link className='product-create-page__addLink bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("flexible_cars_monthly_prices", ["months", "value"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-4'>
            {
                Array.isArray(datas?.flexible_cars_monthly_prices) && datas?.flexible_cars_monthly_prices.map((item, index) => {
                  const { months, value } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("flexible_cars_monthly_prices", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Months</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name='months' placeholder="Enter Months" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={months} onChange={(e) => handleInputChange2(e, "flexible_cars_monthly_prices", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Values</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name='value' placeholder="Enter Value" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={value} onChange={(e) => handleInputChange2(e, "flexible_cars_monthly_prices", index)} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Personal</div>
              <Link className='product-create-page__addLink bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("personal_cars_monthly_prices", ["months", "value"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-4'>
            {
                Array.isArray(datas?.personal_cars_monthly_prices) && datas?.personal_cars_monthly_prices.map((item, index) => {
                  const { months, value } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("personal_cars_monthly_prices", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Months</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name='months' placeholder="Enter Months" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={months} onChange={(e) => handleInputChange2(e, "personal_cars_monthly_prices", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Values</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name='value' placeholder="Enter Value" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={value} onChange={(e) => handleInputChange2(e, "personal_cars_monthly_prices", index)} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] mb-4">Properties</div>
            <div className='grid  gap-4'>

              {propertiesList &&
                Object.keys(propertiesList).map((category) => (
                  <div className='' key={category}>
                    <div className="h4 text-[#7D8CA7] text-[1.1rem] capitalize mb-4">
                      {category.replaceAll("_", " ")}
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      {propertiesList[category].map((property) => {
                        // Get the existing value from propertiesList2
                        const existingValue = propertiesList2[category]?.find((item) => item.property_id === property.id)?.property_value || "";

                        return (
                          <div className='my-2' key={property.id}>
                            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> {property.property_title} </div>
                            {property.property_field_type === "input" ? (
                              <input
                                className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                value={existingValue}
                                onChange={(e) =>
                                  handleChange3(category, property.id, e.target.value)
                                }
                              />
                            ) : (property.property_field_type === "selector" || property.property_field_type === "radio") ? (
                              <select
                                className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                value={existingValue}
                                onChange={(e) =>
                                  handleChange3(category, property.id, e.target.value)
                                }
                              >
                                <option>-----------Select----------</option>
                                {property.property_values.map((value, idx) => (
                                  <option key={idx} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                            ) : property.property_field_type === "checkbox" ? (
                              <div className='grid grid-cols-4 gap-3'>
                                {property.property_values.map((value, idx) => (
                                  <div className="flex items-center" key={idx}>
                                    <input onChange={(e) => handleChange4(category, property.id, e.target.value, existingValue)} id={value} type="checkbox" value={value} checked={existingValue.includes(value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm " />
                                    <label htmlFor={value} className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value}</label>
                                  </div>
                                ))}
                              </div>
                            )
                              : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className={`flex justify-between items-center`}>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] mb-4">Extra Prices</div>
            <div className='cursor-pointer'  onClick={handleExtraClick} >
            <img src={DropDown} className={`transform ${dropDownState && `rotate-[180deg]`}  `} alt="Extra" />
            </div>
            </div>
            <div className={`${dropDownState ? "overflow-hidden h-0" : "min-h-0"}`}>
            {
              Array.isArray(coverages) &&
              coverages.map((item) => {
                const { coverage_id, coverage_title, less_30_days_price, more_30_days_price } = item
                return (
                  <div key={coverage_id}>
                    <div className="h4 text-[#7D8CA7] text-[1.1rem] capitalize mt-4 mb-5"> {coverage_title} </div>
                    <div className='grid grid-cols-2 gap-3'>
                    <div>
                      <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> Less 30 Days Price </div>
                      <input className="outline-none w-full h-[3rem] px-5 rounded-xl" value={less_30_days_price} onChange={(e) => handleChangeCoverages(coverage_id, e.target.value,"less_30_days_price")} />
                      </div>
                      <div>
                        <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> More 30 Days Price </div>
                        <input className="outline-none w-full h-[3rem] px-5 rounded-xl" value={more_30_days_price} onChange={(e) => handleChangeCoverages(coverage_id, e.target.value,"more_30_days_price")} />
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </div> 
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div>
              <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Specification Auto</div>
              <select value={datas?.specification_auto} onChange={(e) => handletype(e.target.value, "specification_auto")} name="specification_auto" className="outline-none w-full h-[3rem] px-5 rounded-xl"  >
                <option value={""}>---select specification Auto ---</option>
                <option value={"1"}>Full Option (Roof hatch, Apple CarPlay / Android Auto, Cruise control )</option>
                <option value={"2"}>Medium Option ( Multimedia system, 4 power windows, Cruise control)</option>
                <option value={"3"}>Basic Option (Radio / AUX , 4 power windows, 4 airbags)</option>
              </select>
            </div>
            <br />
            <br />
            <div className='flex flex-wrap gap-2 mt-4'>
              <div className="overflow-hidden relative  px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="product_status" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">Product Status</span>
                </label>
              </div>

              <div className="overflow-hidden relative  px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="stock_status" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">Stock Status</span>
                </label>
              </div>
              <div className="overflow-hidden relative  px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="show_documents" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">Show Documents</span>
                </label>
              </div>
              <div className="overflow-hidden relative  px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="book_now_button" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">book Now Button</span>
                </label>
              </div>
              <div className="overflow-hidden relative  px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="show_on_home" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">show on home</span>
                </label>
              </div>
              <div className="overflow-hidden relative  px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="promo_status" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">promo status</span>
                </label>
              </div>
              <div className="overflow-hidden relative  px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field value="1" type="checkbox" name="featured" className="sr-only peer" />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">featured</span>
                </label>
              </div>
            </div>
          </div>
          {(userdata?.role_id !== 12) ?
          <div className="product-create-page__actions">
            <Link to="/products" className="product-create-page__cancel">
              Cancel
            </Link>
            <SubmitButton
              props={{
                class: "product-create-page__submit btn bg-secondary text-white px-12 uppercase py-3 rounded-full w-100 block submit hover:bg-primary transition-all duration-300",
                text: "Create Product",
              }}
              buttonLoading={res.isLoading}
            />
          </div>
          : ""
        }
          
        </Form>
      </Formik>
    </div>
  )
}

export default CreateProducts
