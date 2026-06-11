import React, { useContext, useEffect, useState } from 'react'
import useGet from '../customHooks/useGet';
import { Pagination, Space, Table } from 'antd';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { InquriyData } from '../data/data';
import SkeletonEnquiries from './SkeletonEnquiries';
import dayjs from 'dayjs';

const Enquiries = () => {
      const { mainLanguage } = useContext(MainLanguageContext);
    const [datas, setDatas] = useState();
    const [tabIndex, setTabIndex] = useState("all")
    const [resget, apiMethodGet] = useGet();
    useEffect(() => {
            apiMethodGet(`enquiries/list/all/${mainLanguage}/10?page=1`);
        
    }, []);
    const [currentPage, setCurrentPage] = useState(1)

    const onChange = (current, pageSize) => {
        setCurrentPage(current)
            apiMethodGet(`enquiries/list/all/${mainLanguage}/10?page=${current}`);

    };
    useEffect(() => {
        if (!resget.isLoading) {
            setDatas(resget?.data?.data)
        }

    }, [resget.data])

    useEffect(() => {
        if (resget.data) {
          console.log(resget?.data?.data)
            const updatedData = resget?.data?.data?.map((item, index) => ({
                ...item,
                key: `item-${index}`, // Add a unique key to each object
            }));
            setDatas(updatedData);
        }
    }, [resget.data]);

   const handleUpdate = (active) => {
    setCurrentPage(1)
    setTabIndex(active)
    apiMethodGet(`enquiries/list/${active}/${mainLanguage}/10?page=1`);
   }
   
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Submit Time',
          render: (_, record) => (
            <>
             <div className='w-[200px]'>
            <b>{dayjs(record?.created_at).format('YYYY-MM-DD hh:mm A')}</b>
             </div>
            </>
          ),
        },
        
        {
          title: 'Client Name',
          render: (_, record) => (
            <>
             <Space size="middle">
             {record.client_name} {record?.client_last_name ?? ""}
           </Space>
            </>
          ),
        },
        {
          title: 'Client Data',
          render: (_, record) => (
            <>
             <div>
            <b>Email:</b><span>{record?.client_email}</span>
            <br />
            <b>PN:</b><span>{record?.client_phone}</span>
           </div>
            </>
          ),
        },
        {
          title: 'Comment',
          dataIndex: 'client_comments',
          key: 'client_comments',
          render: (_, record) => (
            <>
             <div className='w-[400px]'>
              {record.client_comments}
           </div>
            </>
          ),
        },
        {
          title: 'Comapny Name',
          dataIndex: 'company_name',
          key: 'company_name',
        },
        {
          title: ' Type',
          dataIndex: 'form_type',
          key: 'form_type',
        },
         {
          title: ' Data',
          render: (_, record) => (
            <>
             <Space size="middle">
           <ul>
           {record?.car_name && <li>Car Name : {record?.car_name}</li>}
            <li>Referer Page Slug : {record?.referer_page_slug}</li>
           </ul>
           </Space>
            </>
          ),
        },
       
         
       
      ];

  return (
    <div className='pr-10'>
        <h2 className='font-Mluvka text-[1.938rem] max-lg:text-[1.1rem] mb-2'>Enquiries</h2>
         <div className="bookingPage-left flex items-center">
       
                       <ul className='list flex gap-6 mb-4 max-lg:flex-wrap'>
                           {
                               InquriyData.map((item, index) => {
                                   const { label, color,active } = item
                                   return (
                                       <li key={index} className={`font-MluvkaBold border-l-2 leading-[1] pl-2 cursor-pointer transition-all duration-300 ease-in-out   ${tabIndex === active ? "text-[#000] active" : "text-[#999]"}`} style={{ borderColor: color }} onClick={() => handleUpdate(active)}>{label}</li>
                                   )
                               })
                           }
                       </ul>
                   </div>
                   <div className='relative'>
                    {
                      resget.isLoading ? 
                      <SkeletonEnquiries />
                      :
                      <div>
                      <div className='bookingPagepagination overflow-auto'>
   
       <Table  scroll={{ x: 1300 }}  dataSource={datas} columns={columns} />
                      </div>
   
   
     { (datas?.length !== 0 || !resget?.error) && <div className='my-4'>
               <Pagination
                   onChange={onChange}
                   current={currentPage}
                   total={resget.data?.pagination?.total}
                   pageSize={10}
                    showSizeChanger={false}
                   />
           </div>}
           </div>
                    }
  
                </div>

    </div>
  )
}

export default Enquiries