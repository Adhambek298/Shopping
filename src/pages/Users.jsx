import { Button, Flex, List, Modal, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import Axios from '../api';
import { urls } from '../constants/urls';

function Users() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState (false)
  const [deletedElement, setDeletedElement] = useState(null);
  const [Deletedloading, setLoadingDeleted] = useState(false);


  
    const handleDeleteOpen = () => {
      setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
      setDeleteOpen(false);
    };

      const handleDelete = (users) => {
        handleDeleteOpen();
        setDeletedElement(users);
      };

  function getUsers() {
    setLoading(true)
    Axios.get(urls.users.getList)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log("Eror ashipka")).finally(() => setLoading(false));
  }

  
    const handleDeleteModalOk = async () => {
      setLoadingDeleted(true);
      try {
        const res = await Axios.delete(urls.users.delete(deletedElement.id));
        if (res.status === 200 || res.status === 201) {
          handleDeleteClose();
          setDeletedElement(null);
          getUsers();
          setLoadingDeleted(false);
        }
      } catch (error) {
        console.log("Erorr ashipka ");
        setLoadingDeleted(false);
      }
    };

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level="5">Foydalanuvchidalar</Typography.Title>
        <Button type="primary">+ Qo'shish</Button>
      </Flex>

      <List
        bordered
        loading={loading}
        dataSource={users}
        renderItem={(item) => {
          return (
            <List.Item>
              <Space direction="vertical">
                <Typography>{item.name}</Typography>
                <Typography>{item.email}</Typography>
              </Space>
              <Space>
                <Button danger onClick={() => handleDelete(item)}>
                  O'chirish
                </Button>
              </Space>
            </List.Item>
          );
        }}
      />
      {deletedElement !== null && (
        <Modal
          title="Foydalanuvchini o'chirmoqchimisiz?"
          open={deleteOpen}
          onOk={handleDeleteModalOk}
          onCancel={handleDeleteClose}
          okText="Ha"
          cancelText="Yo'q"
          okButtonProps={{
            loading: Deletedloading,
            danger: true,
          }}
        >
          <Typography>
            Siz bu {deletedElement.name} Foydalanuvchini o'chirmoqchimisz?
          </Typography>
        </Modal>
      )}
    </div>
  );
}

export default Users  