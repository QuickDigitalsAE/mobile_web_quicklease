import React, { useContext, useEffect, useState } from "react";
import { MainLanguageContext } from "../context/MainLanguageContext";
import { Modal, Pagination, Space, Table } from "antd";
import useGet from "../customHooks/useGet";
import { Link } from "react-router-dom";

const ActivitiesLogs = () => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [resget, apiMethodGet] = useGet();
  const [datas, setDatas] = useState();
    const [openRowData, setOpenRowData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mainLanguage) {
      apiMethodGet(`activities/adminSideAllLogs/12?page=1`);
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (current, pageSize) => {
    setCurrentPage(current);
    apiMethodGet(`activities/adminSideAllLogs/10?page=${current}`);
  };

  useEffect(() => {
    if (resget.data) {
      const updatedData = resget?.data?.data?.map((item, index) => ({
        ...item,
        key: `item-${index}`, // Add a unique key to each object
      }));
      setDatas(updatedData);
    }
  }, [resget.data]);


    const showModal = (item) => {
    setOpenRowData(item)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User",
   render: (_, record) => (
              <>
              <div>{record?.user_name}</div>
              <div>{record?.user_email}</div>
              </>
            ),
  },
  // {
  //   title: "Changes",
  //   render: (_, record) => (
  //             <>
  //              {/* <div>
  //       {JSON.stringify(record?.changes, null, 2)}
  //     </div> */}
  //             </>
  //           ),
  // },
  {
    title: "Identity",
    dataIndex: "row_identity", // example field
    key: "row_identity",
  },
  {
    title: "Table Name",
    dataIndex: "table_name", // example field
    key: "table_name",
  },
  {
    title: "Updated",
    dataIndex: "action", // example field
    key: "action",
  },
  {
    title: "Date",
    dataIndex: "created_at", // example field
    key: "created_at",
  },
   {
      key: 'action',
      title: 'Action',
fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
         <div className='flex items-center gap-3 tableaction'>
         <Link key={`view-${record.id}`} onClick={() => showModal(record)}>
          <img src={require("../dist/webImages/view.png")} alt="" />
        </Link>
         </div>
        </Space>
      ),
    },
];
  
  return (
    <div className="pr-10">
      <h2 className="font-Mluvka text-[1.938rem] max-lg:text-[1.1rem] mb-2">
        Activities Logs
      </h2>
      <div className="relative">
        {resget.isLoading ? (
          ""
        ) : (
          <div>
            <div className="bookingPagepagination overflow-auto">
              <Table
                scroll={{ x: 1300 }}
                dataSource={datas}
                columns={columns}
              />
            </div>

            {(datas?.length !== 0 || !resget?.error) && (
              <div className="my-4">
                <Pagination
                  onChange={onChange}
                  current={currentPage}
                  total={resget.data?.pagination?.total}
                  pageSize={10}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        )}
      </div>
       {openRowData &&   <Modal width={'70%'} title={openRowData?.user_name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                    <div className='venderview'>
                <h2></h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                        <label htmlFor=""><b>Id</b>: </label>
                        <span>{openRowData.id}</span>
                      </div>
                      <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                        <label htmlFor=""><b>Email</b>: </label>
                        <span>{openRowData.user_email}</span>
                      </div>
                      <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                        <label htmlFor=""><b>Identity</b>: </label>
                        <span>{openRowData.row_identity}</span>
                      </div>
                      <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                        <label htmlFor=""><b>Table Name</b>: </label>
                        <span>{openRowData.table_name}</span>
                      </div>
                      <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                        <label htmlFor=""><b>Updated</b>: </label>
                        <span>{openRowData.action}</span>
                      </div>
                      <div className="venderview py-2 px-3 bg-[#ddd] rounded-md">
                        <label htmlFor=""><b>Date</b>: </label>
                        <span>{openRowData.created_at}</span>
                      </div>
                    </div>
           <div className="venderview mt-4 py-2 px-3 bg-[#ddd] rounded-md">
                        <label htmlFor=""><b>Changes</b>: </label>
                        <span>{JSON.stringify(openRowData?.changes, null, 2)}</span>
                      </div>

                     
                    </div>
                   
                  

        </Modal>}
    </div>
  );
};

export default ActivitiesLogs;
