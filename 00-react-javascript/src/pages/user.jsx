import { notification, Table } from "antd";
import axios from "../utils/axios.customize.js";
import { useEffect, useState } from "react";
import { fetchUserApi } from "../utils/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    
    useEffect(() => {
        const getUserList = async () => {
            const res = await fetchUserApi();
            if(!res?.message) {
              setDataSource(res.data)
            } else {
              notification.error({
                message: "Unauthorized",
                description: res.message
              })
            }
          }
        getUserList()
    }, [])
  const columns = [
    {
        title: "Id",
        dataIndex: "_id",
    },
    {
        title: "Email",
        dataIndex: "email",
      },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default UserPage;
