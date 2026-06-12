import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Pagination, Table } from 'antd';
import { FiClock, FiMail, FiMessageSquare, FiPhone } from 'react-icons/fi';
import useGet from '../customHooks/useGet';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { InquriyData } from '../data/data';
import SkeletonEnquiries from './SkeletonEnquiries';
import dayjs from 'dayjs';

const Enquiries = () => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [datas, setDatas] = useState([]);
  const [tabIndex, setTabIndex] = useState("all")
  const [resget, apiMethodGet] = useGet();
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    apiMethodGet(`enquiries/list/all/${mainLanguage}/10?page=1`);
  }, []);

  useEffect(() => {
    if (resget.data) {
      const updatedData = resget?.data?.data?.map((item, index) => ({
        ...item,
        key: `item-${index}`,
      }));
      setDatas(updatedData || []);
    }
  }, [resget.data]);

  const onChange = (current) => {
    setCurrentPage(current)
    apiMethodGet(`enquiries/list/${tabIndex}/${mainLanguage}/10?page=${current}`);
  };

  const handleUpdate = (active) => {
    setCurrentPage(1)
    setTabIndex(active)
    apiMethodGet(`enquiries/list/${active}/${mainLanguage}/10?page=1`);
  }

  const columns = useMemo(
    () => [
      {
        title: 'Lead',
        key: 'lead',
        width: 220,
        render: (_, record) => (
          <div className="enquiries-table__identity">
            <div>
              <div className="enquiries-table__primary">{record.client_name} {record?.client_last_name ?? ""}</div>
              <div className="enquiries-table__secondary">#{record.id}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Submitted',
        key: 'submitted',
        width: 210,
        render: (_, record) => (
          <div className="users-table__meta">
            <FiClock className="users-table__metaIcon" />
            <span>{dayjs(record?.created_at).format('YYYY-MM-DD hh:mm A')}</span>
          </div>
        ),
      },
      {
        title: 'Contact',
        key: 'contact',
        width: 260,
        render: (_, record) => (
          <div>
            <div className="users-table__meta">
              <FiMail className="users-table__metaIcon" />
              <span>{record?.client_email || 'No email'}</span>
            </div>
            <div className="users-table__meta enquiries-table__contactRow">
              <FiPhone className="users-table__metaIcon" />
              <span>{record?.client_phone || 'No phone'}</span>
            </div>
          </div>
        ),
      },
      {
        title: 'Comment',
        key: 'comment',
        width: 340,
        render: (_, record) => (
          <div className="enquiries-table__comment">
            <FiMessageSquare className="enquiries-table__commentIcon" />
            <span>{record.client_comments || 'No comment provided'}</span>
          </div>
        ),
      },
      {
        title: 'Company',
        dataIndex: 'company_name',
        key: 'company_name',
        width: 180,
        render: (value) => <span className="enquiries-table__text">{value || 'No company'}</span>,
      },
      {
        title: 'Type',
        dataIndex: 'form_type',
        key: 'form_type',
        width: 160,
        render: (value) => <span className="enquiries-table__badge">{value || 'N/A'}</span>,
      },
      {
        title: 'Source',
        key: 'source',
        width: 260,
        render: (_, record) => (
          <div>
            {record?.car_name && <div className="enquiries-table__sourceLine">Car: {record?.car_name}</div>}
            <div className="enquiries-table__sourceLine">Referrer: {record?.referer_page_slug || 'N/A'}</div>
          </div>
        ),
      },
    ],
    []
  );

  if (resget.isLoading && !datas?.length) {
    return <SkeletonEnquiries />;
  }

  return (
    <section className='users-table-page enquiries-table-page'>
      <div className="users-table-page__top bg-white rounded-3xl p-4 enquiries-table-page__top flex justify-between items-center">
        <div>
          <h6 className='text-[1rem] mb-2 relative font-Mluvka'>
            <span>{datas?.length ?? 0}</span> Enquiries
          </h6>
          <p className="users-table-page__subtitle">
            Review incoming leads, contact details, and source context from one compact table view.
          </p>
        </div>
      </div>

      <div className="users-table-page__panel">
        <div className="users-table-page__stats">
          <article>
            <span>Total results</span>
            <strong>{datas?.length ?? 0}</strong>
          </article>
          <article>
            <span>Current filter</span>
            <strong>{tabIndex.replaceAll('_', ' ')}</strong>
          </article>
          <article>
            <span>With company</span>
            <strong>{Array.isArray(datas) ? datas.filter((item) => item.company_name).length : 0}</strong>
          </article>
        </div>

        <ul className='list enquiries-table-page__tabs'>
          {InquriyData.map((item, index) => {
            const { label, color, active } = item
            return (
              <li
                key={index}
                className={`enquiries-table-page__tab ${tabIndex === active ? "active" : ""}`}
                style={{ '--enquiry-tab-color': color }}
                onClick={() => handleUpdate(active)}
              >
                {label}
              </li>
            )
          })}
        </ul>

        <div className='users-table-page__tableWrap'>
          {resget.isLoading ? (
            <SkeletonEnquiries />
          ) : (
            <Table
              scroll={{ x: 1500 }}
              dataSource={datas}
              columns={columns}
              pagination={false}
              locale={{ emptyText: 'No enquiries found' }}
            />
          )}
        </div>

        {(datas?.length !== 0 || !resget?.error) && <div className='my-1'>
          <Pagination
            onChange={onChange}
            current={currentPage}
            total={resget.data?.pagination?.total}
            pageSize={10}
            showSizeChanger={false}
          />
        </div>}
      </div>
    </section>
  )
}

export default Enquiries
