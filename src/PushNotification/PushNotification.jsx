import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import plus from '../dist/webImages/plus.svg';
import useGet from '../customHooks/useGet';
import SkeletonPushNotificationCard from './SkeletonPushNotificationCard';
import PushNotificationCard from './PushNotificationCard';

const PAGE_SIZE = 10;

const PushNotification = ({ permission }) => {
  const [datas, setDatas] = useState([]);
  const [paginationn, setPaginationn] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [resget, apiMethodGet] = useGet();

  useEffect(() => {
    apiMethodGet(`admin/notifications?page=${currentPage}&per_page=${PAGE_SIZE}`);
  }, [currentPage]);

  useEffect(() => {
    if (!resget?.isLoading && resget?.data) {
      const responseData = resget?.data?.data;
      const list = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData?.data)
          ? responseData?.data
          : [];
      const paginationData = resget?.data?.pagination ?? responseData?.pagination ?? {};

      setDatas(list);
      setPaginationn(paginationData);
    }
  }, [resget?.data, resget?.isLoading]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const check = (module, action) => permission?.[module]?.includes(action);

  return (
    <div className='Promotions pr-10 max-lg:pr-6'>
      <div className="TeamPageTop flex justify-between items-center">
        <h6 className='text-[1rem] mb-2 bookingSectionh relative px-3 font-Mluvka capitalize'>
          Push Notifications
        </h6>
        {check('PushNotification', 'PushNotification Add') && (
          <Link
            to="/push-notification/create"
            className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'
          >
            <img src={plus} alt="plus" />
            <span className='font-MluvkaBold text-secondary capitalize'>Create Notification</span>
          </Link>
        )}
      </div>

      <div className="NewsPageGrid mt-4 bg-[#EFF4FD] rounded-3xl p-6 grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:p-3">
        {resget.isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <React.Fragment key={index}>
                <SkeletonPushNotificationCard />
              </React.Fragment>
            ))
          : datas.map((item) => (
              <React.Fragment key={item?.id}>
                <PushNotificationCard
                  permission={permission}
                  data={item}
                  alldata={datas}
                  deleted={setDatas}
                />
              </React.Fragment>
            ))}
      </div>

      <div className='mt-4'>
        <Pagination
          current={currentPage}
          onChange={onChange}
          total={paginationn?.total ?? datas?.length ?? 0}
          pageSize={paginationn?.per_page ?? PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default PushNotification;
