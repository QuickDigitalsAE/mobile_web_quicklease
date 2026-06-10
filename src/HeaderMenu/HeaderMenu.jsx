import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import plus from '../dist/webImages/plus.svg'
import { MainLanguageContext } from '../context/MainLanguageContext';
import useGet from '../customHooks/useGet';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table } from 'antd';

const HeaderMenu = () => {
    const { mainLanguage } = useContext(MainLanguageContext);
    const [resget, apiMethodGet] = useGet()
    const [data, setData] = useState("")
    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`menus/getAll/${mainLanguage}/header`);
        }
    }, [mainLanguage]);
    useEffect(() => {
        if (resget?.data) {
            setData(resget?.data?.data);
        }
    }, [resget.data]);


    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Title',
          dataIndex: 'menu_title',
          key: 'menu_title',
        },
        {
          title: 'Type',
          dataIndex: 'menu_type',
          key: 'menu_type',
        },
        {
          title: 'Object',
          dataIndex: 'Object',
          key: 'Object',
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: () => {
         return(
            <div className='flex gap-1'>
            <Link to={""}>
            <FaEdit />
            </Link>  
            <Link to={""}>
            <MdDelete />
            </Link>  
            </div>
         )
        },
        },
      ];




    if (resget.isLoading) return "";
  return (
    <div className='headerMenu pr-10 max-lg:pr-6'>
    <div className="servicesTop flex justify-between items-center mb-4">
        <h6 className='text-[1rem] mb-2 bookingSectionh relative px-3 font-Mluvka'> Header Menu</h6>
        <Link to={"/header/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' >
            <img src={plus} alt="plus" />
            <span className='font-MluvkaBold text-secondary capitalize'>Add Header Menu</span>
        </Link>
    </div>

    <div className="headerMenuBoby">
   
        <Table
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
        </p>
      ),
      rowExpandable: (record) => Array.isArray(record.children) && record.children.length > 0,
    }}
    dataSource={data}
  />
    </div>
  
</div>
  )
}

export default HeaderMenu