import React, { useContext, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import StatusToggle from '../components/form/StatusToggle';
import { FiPlus } from 'react-icons/fi';

const EditProducts = ({ permission }) => {
  const { id } = useParams();
  const { userdata } = useContext(MainUserDataContext);
  const navigate = useNavigate();
  const [dropDownState, setDropDownState] = useState(true)
  const [imageLoader, setImageLoader] = useState(false)
  const { mainLanguage } = useContext(MainLanguageContext);
  const [resget, apiMethodGet] = useGet()
  const [resget2, apiMethodGet2] = useGet()
  const [resget4, apiMethodGet4] = useGet()
  const [resget5, apiMethodGet5] = useGet()
  const [propertiesList, setPropertiesList] = useState("")
  const [propertiesList2, setPropertiesList2] = useState("")
  const [catlogsList, setCatlogsList] = useState("")
  const [catlogsList2, setCatlogsList2] = useState("")
  const [coverages, setCoverages] = useState("")
  const [datas, setDatas] = useState({
    "car_images": [""],
    "flexible_cars_monthly_prices": [{
      months: "",
      value: "",
    }],
    "personal_cars_monthly_prices": [{
      months: "",
      value: "",
    }],
  })

  const [parent_id, setParent_id] = useState("")
  const [slugs, setSlugs] = useState({
    "slugs": "",
    "all_slugs": "",
  })

  useEffect(() => {
    apiMethodGet(`products/edit/${id}/${mainLanguage}`)
  }, [mainLanguage]);
  useEffect(() => {
    apiMethodGet4(`products/carsLocations/en`)
  }, []);

  useEffect(() => {
    if (resget?.data) {
      let a = resget?.data?.data;
      let coverages_list = resget?.data?.data?.coverages_list;
      let related_coverages = resget?.data?.data?.related_coverages;

      let additional_catalogs = []
      let flexible_cars_monthly_p = []
      let personal_cars_monthly_p = []
      setParent_id(resget.data?.data?.catalog_id ?? "")
      let slu = resget.data?.data.slug.split("/")
      slu.pop()
      setSlugs({
        "all_slugs": slu.join("/"),
        "slugs": resget.data?.data.slug.split("/")[resget.data?.data.slug.split("/").length - 1] ?? "",
      })
      if (Array.isArray(a?.additional_catalogs)) {
        for (let index = 0; index < a.additional_catalogs.length; index++) {
          additional_catalogs.push(Number(a.additional_catalogs[index].value))
        }
      }
      for (const item in a?.flexible_cars_monthly_prices) {
        flexible_cars_monthly_p.push({
          months: item.split("_")[0],
          value: a.flexible_cars_monthly_prices[item],
        })
      }
      for (const item in a?.personal_cars_monthly_prices) {
        personal_cars_monthly_p.push({
          months: item.split("_")[0],
          value: a.personal_cars_monthly_prices[item],
        })
      }

      a["additional_catalog_ids"] = additional_catalogs;
      a["flexible_cars_monthly_prices"] = flexible_cars_monthly_p;
      a["personal_cars_monthly_prices"] = personal_cars_monthly_p;
      setDatas(a);
      setPropertiesList(a.groupedProperties);

      const initialData = {};
      Object.keys(a.groupedProperties || {}).forEach((category) => {
        initialData[category] = a.groupedProperties[category].map((item) => ({
          property_id: item.property_id,
          property_value: item?.product_property_values,
        }));
      });

      const updatecoverages_list = Array.isArray(coverages_list)
        ? coverages_list.map((item) => {
          const matchh = related_coverages.find((ite) => ite.coverage_id === item?.coverage_id);
          return matchh
            ? {
              coverage_id: matchh?.coverage_id,
              coverage_title: matchh?.coverage_title,
              id: matchh?.id,
              less_30_days_price: matchh?.less_30_days_price,
              more_30_days_price: matchh?.more_30_days_price,
            }
            : {
              coverage_id: item?.coverage_id,
              coverage_title: item?.coverage_title,
              less_30_days_price: "",
              more_30_days_price: "",
            };
        })
        : [];

      setPropertiesList2(initialData);
      setCoverages(updatecoverages_list);
    }
  }, [resget?.data]);

  useEffect(() => {
    apiMethodGet2(`catalogs/dropdownList/en`)
  }, []);

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

  const handleSlugUpdate = (e) => {
    setSlugs({
      ...slugs,
      "slugs": e.target.value,
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

  const handleCkChange = (e, type) => {
    setDatas(d => ({ ...d, [type]: e }));
  };

  const handletype = (e, type) => {
    setDatas((d) => ({ ...d, [type]: e }));
  };

  const handleChange4 = (category, property_id, value, old) => {
    console.log(category, property_id, value, old)
    setPropertiesList2((prev) => ({
      ...prev,
      [category]: prev[category]
        ? prev[category].map((item) =>
          item.property_id === property_id
            ? {
              ...item,
              property_value: old.includes(value) ? (Array.isArray(old) && old.filter((v) => v != value)) : [...old, value],
            }
            : item
        )
        : [{ property_id, property_value: [value] }],
    }));
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

  const handleChangeCoverages = (coverage_id, value, type) => {
    setCoverages(prevService => prevService.map((item) => item?.coverage_id === coverage_id ? { ...item, [type]: value } : item));
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
  const requireFeild = ["meta_title", "meta_description", "slug", "model", "year"];
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
        slug: "slug",
        model: "model",
        year: "year",
      };
      let checkerRequried = [];
      for (const item in values) {
        if (requireFeild.includes(item) && !values[item]) {
          checkerRequried.push(requireFeildSwal[item]);
        }
      }

      if (!datas?.vehicle_type) {
        checkerRequried.push("vehicle_type");
      }
      if (!parent_id) {
        checkerRequried.push("catalog_id");
      }
      if (slugs.slugs) {

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
        carImage.push(datas?.car_images[index]?.image_path ?? "")

      }
      // let coveragesList = coverages.filter((item) => item?.less_30_days_price) 

      const formatMonthlyPrices = (prices) =>
        prices.reduce((acc, item) => {
          if (item.value !== null && item.value !== undefined && item.value !== '') {
            acc[`${item.months}_months`] = item.value;
          }
          return acc;
        }, {});
      const flexible_cars_monthly = formatMonthlyPrices(datas.flexible_cars_monthly_prices);
      const personal_cars_monthly = formatMonthlyPrices(datas.personal_cars_monthly_prices);
      const updateData = {
        "slug": slugs.all_slugs ? `${slugs.all_slugs}/${slugs.slugs}` : slugs.slugs,
        "catalog_id": parent_id ?? "",
        "stock_status": values["stock_status"].length > 0 ? 1 : 0,
        "show_documents": values["show_documents"].length > 0 ? 1 : 0,
        "book_now_button": values["book_now_button"].length > 0 ? 1 : 0,
        "product_status": values["product_status"].length > 0 ? 1 : 0,
        // "product_status": 1,
        "show_on_home": values["show_on_home"].length > 0 ? 1 : 0,
        "promo_status": values["promo_status"].length > 0 ? 1 : 0,
        "featured": values["featured"].length > 0 ? 1 : 0,
        "specification_auto": datas?.specification_auto,
        "vehicle_type": datas?.vehicle_type,
        "car_locations": datas?.car_locations,
        "additional_catalog_ids": datas?.additional_catalog_ids,
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
        "security_deposit": values["security_deposit"] ?? 0,
        "security_deposit_waiver_daily": values["security_deposit_waiver_daily"] ?? 0,
        "security_deposit_waiver_monthly": values["security_deposit_waiver_monthly"] ?? 0,
        "down_payment": values["down_payment"],
        "pay_now_discount": values["pay_now_discount"],
        car_images: carImage,
        properties: propertiesList2,
        coverages: coverages,
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
        apiMethod(`products/update/${id}/${mainLanguage}`, updateData)
      }
    }
  };

  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === "false") {
        toast.error(message);
      }
      else {
        navigate(`/products`)
        toast.success(message);
      }
    }
  }, [res.data])
  if (resget.isLoading || !resget?.data || resget2.isLoading || resget4.isLoading) return <SkeletonCreateEdit heading={"Edit Products"} />;
  const { description, short_description, car_images } = datas;
  let aa = resget?.data?.data?.slug.split("/").length

  let initialValues = {
    meta_title: resget?.data?.data?.meta_title,
    meta_description: resget?.data?.data?.meta_description,
    product_title: resget?.data?.data?.product_title,
    heading_one: resget?.data?.data?.heading_one,
    car_locations: resget?.data?.data?.car_locations,
    daily_price: resget?.data?.data?.daily_price,
    old_daily_price: resget?.data?.data?.old_daily_price,
    weekly_price: resget?.data?.data?.weekly_price,
    old_weekly_price: resget?.data?.data?.old_weekly_price,
    monthly_price: resget?.data?.data?.monthly_price,
    old_monthly_price: resget?.data?.data?.old_monthly_price,
    cars_monthly_price: resget?.data?.data?.cars_monthly_price,
    cars_yearly_price: resget?.data?.data?.cars_yearly_price,
    installment_per_month: resget?.data?.data?.installment_per_month,
    installment_per_month_with_down: resget?.data?.data?.installment_per_month_with_down,
    down_payment: resget?.data?.data?.down_payment,
    pay_now_discount: resget?.data?.data?.pay_now_discount ?? 0,
    model: resget?.data?.data?.model,
    year: resget?.data?.data?.year,
    security_deposit: resget?.data?.data?.security_deposit,
    security_deposit_waiver_daily: resget?.data?.data?.security_deposit_waiver_daily,
    security_deposit_waiver_monthly: resget?.data?.data?.security_deposit_waiver_monthly,
    stock_status: resget?.data?.data?.stock_status && [`${String(resget?.data?.data?.stock_status)}`],
    show_documents: resget?.data?.data?.show_documents && [`${String(resget?.data?.data?.show_documents)}`],
    book_now_button: resget?.data?.data?.book_now_button && [`${String(resget?.data?.data?.book_now_button)}`],
    product_status: resget?.data?.data?.product_status && [`${String(resget?.data?.data?.product_status)}`],
    show_on_home: resget?.data?.data?.show_on_home && [`${String(resget?.data?.data?.show_on_home)}`],
    promo_status: resget?.data?.data?.promo_status && [`${String(resget?.data?.data?.promo_status)}`],
    featured: resget?.data?.data?.featured && [`${String(resget?.data?.data?.featured)}`],
  };
  const check = (module, action) => permission?.[module]?.includes(action);

  return (
    <div className='newscreate product-create-page'>
      <div className="product-create-page__hero">
        <div>
          <span className="product-create-page__eyebrow">Inventory Update</span>
          <h2>Refine this product with the same clean workflow</h2>
          <p>
            Update product content, media, pricing, properties, and booking settings using the same modern layout as product creation.
          </p>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form name="myForm" className="product-create-page__form product-create-page__form--compact">
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
            <div className="">
              <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Slug - {slugs.all_slugs}</div>
              {
                mainLanguage === "en" ?
                  <input value={slugs?.slugs ?? ""} onChange={handleSlugUpdate} name="slug" label={"Slug"} placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[red]" control="input2" />
                  :
                  <div className='inputBox w-full mt-3'>
                    <p className="outline-none bg-[#e7e7e7] w-full h-[3rem] px-5 rounded-xl py-3">{datas?.slug}</p>
                  </div>

              }
            </div>
            {mainLanguage === "en" && <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> Catalog</div>
                <select value={parent_id ?? ""} onChange={handleParent} name="catalog_id" className="outline-none w-full h-[3rem] px-5 rounded-xl" >
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
                  value={datas?.car_locations}
                  options={resget4?.data?.data && Object.entries(resget4?.data?.data?.locations).map(([key, value]) => ({
                    label: value,
                    value: key,
                  }))}
                />
              </div>
              <div className='antdheight'>
                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Additional Catalogs</div>
                <Select
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(e) => handleChange(e, "additional_catalog_ids")}
                  value={datas?.additional_catalog_ids}
                  style={{
                    width: '100%',
                  }}
                  options={catlogsList2}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </div>
            </div>}

            <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

            <div className="grid  gap-2">
              <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
            </div>

            <br />

          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Products</div>
            <FormControl name="product_title" label={"Product Title "} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <br />
            <FormControl name="heading_one" label={"Heading {h1}"} placeholder="Enter Heading One" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

            <br />

            <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Description</div>
            <CKEditors label={"Description"} folder_name={"products_images"} page_type={"products"} data={description} update={(text) => handleCkChange(text, "description")} />
            <br />
            <br />
            <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Product Short Description</div>
            <CKEditors label={"Description"} folder_name={"products_images"} page_type={"products"} data={short_description} update={(text) => handleCkChange(text, "short_description")} />
            {mainLanguage === "en" &&
              <div className='mt-4'>
                <div>
                  <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Main Image </label>
                  <OneImageUpload changeImage={setImageLoader} MainImage={datas?.main_image} Update={setDatas} sec_value={"main_image_value"} sec_image={"main_image"} folder_name={"products_images"} page_type={"products"} />
                </div>
              </div>}

            {mainLanguage === "en" &&
              <div className='mt-4'>
                <div>
                  <div className='flex justify-between'>
                    <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Car Images</div>
                    <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd2("car_images", [])} >
                      <span className='users-table-page__addIcon'>
                        <FiPlus />
                      </span>

                      <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                    </Link>
                  </div>
                  <div className="section4Main relative grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
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
              </div>}

          </div>
          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Price Monthly</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="monthly_price" label={"Price"} placeholder="Enter Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="old_monthly_price" label={"Old Price"} placeholder="Enter Old Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}
          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Price Weekly</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="weekly_price" label={"Price"} placeholder="Enter Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="old_weekly_price" label={"Old Price"} placeholder="Enter Old Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}
          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Price Daily</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="daily_price" label={"Price"} placeholder="Enter Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="old_daily_price" label={"Old Price"} placeholder="Enter Old Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}

          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> Flexible Rentals</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="cars_monthly_price" label={"Monthly Price"} placeholder="Enter Monthly Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="cars_yearly_price" label={"Yearly Price"} placeholder="Enter Yearly Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}

          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="model" label={"Model"} placeholder="Enter Model" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="year" label={"Yearly"} placeholder="Enter Yearly" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="installment_per_month" label={"Installment Per Month"} placeholder="Enter Installment Per Month" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="installment_per_month_with_down" label={"Installment Per Month With Down"} placeholder="Enter Installment Per Month With Down" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="installment_per_month_final_term" label={"Installment Per Month Final Term"} placeholder="Enter Installment Per Month Final Term" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="down_payment" label={"Down Payment"} placeholder="Enter Down Payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>

          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Security Deposit</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="security_deposit" label={"Security Deposit"} placeholder="Enter Security Deposit" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}
          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="pay_now_discount" label={"Pay Now Discount"} placeholder="Enter Pay Now Discount" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}
          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Security Deposit waiver</div>
            <div className='grid grid-cols-2 gap-4'>
              <FormControl name="security_deposit_waiver_daily" label={"security deposit waiver daily"} placeholder="Enter security deposit waiver daily" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="security_deposit_waiver_monthly" label={"security deposit waiver monthly"} placeholder="Enter security deposit waiver monthly" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>}

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Flexible</div>
              <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("flexible_cars_monthly_prices", ["months", "value"])} >
                <span className='users-table-page__addIcon'>
                  <FiPlus />
                </span>
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
              <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("personal_cars_monthly_prices", ["months", "value"])} >
                <span className='users-table-page__addIcon'>
                  <FiPlus />
                </span>
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

          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
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
                        const existingValue = propertiesList2[category]?.find((item) => item.property_id === property.property_id)?.property_value || "";
                        return (
                          <div className='my-2' key={property.property_id}>
                            <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> {property.property_title} </div>
                            {property.property_field_type === "input" ? (
                              <input
                                className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                value={existingValue}
                                onChange={(e) =>
                                  handleChange3(category, property.property_id, e.target.value)
                                }
                              />
                            ) : (property.property_field_type === "selector" || property.property_field_type === "radio") ? (
                              <select
                                className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                value={existingValue}
                                onChange={(e) =>
                                  handleChange3(category, property.property_id, e.target.value)
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
                                    <input onChange={(e) => handleChange4(category, property.property_id, e.target.value, existingValue)} id={value} type="checkbox" value={value} checked={existingValue.includes(value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm " />
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
          </div>}

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className={`flex justify-between items-center`}>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] mb-4">Extra Prices</div>
              <div className='cursor-pointer' onClick={handleExtraClick} >
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
                          <input className="outline-none w-full h-[3rem] px-5 rounded-xl" value={less_30_days_price} onChange={(e) => handleChangeCoverages(coverage_id, e.target.value, "less_30_days_price")} />
                        </div>
                        <div>
                          <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1"> More 30 Days Price </div>
                          <input className="outline-none w-full h-[3rem] px-5 rounded-xl" value={more_30_days_price} onChange={(e) => handleChangeCoverages(coverage_id, e.target.value, "more_30_days_price")} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {mainLanguage === "en" && <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
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
              <StatusToggle name="product_status" label="Product Status" checkedLabel="Enable" />

              <StatusToggle name="stock_status" label="Stock Status" checkedLabel="Enable" />
              <StatusToggle name="show_documents" label="Show Documents" checkedLabel="Enable" />
              <StatusToggle name="book_now_button" label="Book Now Button" checkedLabel="Enable" />
              <StatusToggle name="show_on_home" label="Show On Home" checkedLabel="Enable" />
              <StatusToggle name="promo_status" label="Promo Status" checkedLabel="Enable" />
              <StatusToggle name="featured" label="Featured" checkedLabel="Enable" />
            </div>
          </div>}
          {check("Products", "Products Edit") && (
            <div className="product-create-page__actions">
              <Link to="/products" className="product-create-page__cancel">
                Cancel
              </Link>
              <SubmitButton
                props={{
                  class: "product-create-page__submit btn bg-secondary text-white px-12 uppercase py-3 rounded-full w-100 block submit hover:bg-primary transition-all duration-300",
                  text: "Update Product",
                }}
                buttonLoading={res.isLoading}
              />
            </div>
          )}
        </Form>
      </Formik>
    </div>
  )
}

export default EditProducts
