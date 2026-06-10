
import { webContentTab } from '../data/data';
import { BiEdit } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { Space, Table } from 'antd';

const WebContent = ({permission}) => {
    const columns = [
        {
          title: "Sr. No.",
          dataIndex: "key",
          key: "key",
          width: 100,
          align: "center",
        },
        {
          title: "Page Name",
          dataIndex: "label",
          key: "label",
          render: (text) => <strong>{text}</strong>,
        },
        {
          title: "Action",
          key: "action",
          width: 100,
          align: "center",
          render: (_, record) => (
            <Space>
              <Link to={record.link}>
                <BiEdit />
              </Link>   
            </Space>
          ),
        },
      ];

      const dataSource = webContentTab.map((item, index) => ({
        key: index + 1,
        label: item.label,
        link: item.link,
      }));
    
  return (
    <div className='webContentPage'>
         <div style={{ padding: "24px", background: "#fff" }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
    </div>
    </div>
  )
}

export default WebContent