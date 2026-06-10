import React, { useContext, useEffect, useState } from 'react'
import useGet from '../customHooks/useGet';
import { Pagination, Table } from 'antd';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';

const Quote = () => {
    const [datas, setDatas] = useState();
    const [loading, setLoading] = useState(false)
    const [statusId, setStatusId] = useState("")
        const [paginationn, setPaginationn] = useState(10);
    const [resget, apiMethodGet] = useGet();
    useEffect(() => {
            apiMethodGet(`quicklease/form_list/10?page=1`);
        
    }, []);
    const [currentPage, setCurrentPage] = useState(1)


    const onChange = (current, pageSize) => {
        setCurrentPage(current)
            apiMethodGet(`quicklease/form_list/10?page=${current}`);

    };
    useEffect(() => {
        if (!resget.isLoading) {
            setDatas(resget?.data?.data)
            setPaginationn(resget.data?.pagination)
        }

    }, [resget.data])



    useEffect(() => {
        if (!resget.isLoading) {
            const updatedData = resget?.data?.data?.map((item, index) => ({
                ...item,
                key: `item-${index}`, // Add a unique key to each object
            }));
            setDatas(updatedData);
        }
    }, [resget.data]);


    const handleChange = (record,e) => {
      setDatas((prevDatas) =>
        prevDatas.map((item) =>
          item.id === record?.id ? { ...item, team_comments: e } : item
        )
      );
    }

    const [res, apiMethod] = usePost()

    const handleSubmit = (values) => {
      setLoading(true)
      setStatusId(values?.id)
      let formdata = new FormData();
      console.log(datas?.filter((item) => values?.id === item?.id))
        formdata.append("team_comment" ,datas?.filter((item) => values?.id === item?.id)[0]?.team_comments)
      apiMethod(`quicklease/contractUpdate/${values?.id}`,formdata)
    }

      useEffect(() => {
        if(res.data) {
          const {status,message} = res?.data
          if(status === false) {
            toast.error(message);
          }
          else {
            toast.success(message);
            apiMethodGet(`quicklease/form_list/10?page=${currentPage}`);
          }
        }
      }, [res.data])
    const columns = [
        {
          title: 'Name',
          dataIndex: 'client_name',
          key: 'client_name',
        },
        {
          title: 'Client Contract Number',
          dataIndex: 'client_contract_number',
          key: 'client_contract_number',
        },
        {
          title: 'Service Name',
          dataIndex: 'service_name',
          key: 'service_name',
        },
        {
          title: 'Message',
          dataIndex: 'message',
          key: 'message',
        },
        {
          title: 'Reply',
          render: (_, record) => (
            <>
            {
              record?.team_comment
              ?
              record?.team_comment 
              :
              <div className='flex gap-2'>
              <textarea className='w-full border border-[#ddd] resize-none outline-none px-2 py-2 h-[3rem]' placeholder='Comment' name="" id="" onChange={(e) => handleChange(record,e.target.value)}></textarea>
              <button onClick={() => handleSubmit(record)} className='btn bg-secondary text-white  uppercase   py-3 px-5  rounded-2xl  hover:bg-primary transition-all duration-300'>
                {/* {
                 ( res.isLoading && statusId)?
                  <>
                  <span className='flex items-center'>

                  <svg  role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
       </svg> <span>Loading...</span>
                  </span>
       </>
       : "Submit"

                } */}
                Submit
                
                </button>
              </div>
            }
          
            </>
          ),
        },
      ];

if(!datas) return '';
  return (
    <div className='pr-10'>
        <h2 className='font-Mluvka text-[1.938rem] max-lg:text-[1.1rem] mb-2'>Quote</h2>
    <Table dataSource={datas} columns={columns} />

    <div className='mt-4'>
                <Pagination
                    onChange={onChange}
                    current={currentPage}
                    total={paginationn?.total}
                    pageSize={10}
                />
            </div>


    </div>
  )
}

export default Quote