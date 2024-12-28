import { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Flex,
    Form,
    Image,
    Input,
    List,
    Modal,
    Space,
    Typography,
} from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import Axios from '../api/index'
import { urls } from "../constants/urls";
import axios from "axios";

function Categories() {
    const [categories, setcategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [postLoading, setPostLoading] = useState(false);
    const [editedElement, setEditedElement] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletedElement, setDeletedElement] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false)

    const handleDeleteOpen = () => {
        setDeleteModalOpen(true)
    }

    const handleDeleteClose = () => {
        setDeleteModalOpen(false)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        form.resetFields()
    };

    const handleOk = () => {
        form.submit();
    };
    const handleDeleteModalOk = async  () => {
        setDeleteLoading(true);
        try {
            const res = await Axios.delete(
              urls.cantegories.delete(deletedElement.id)
            );
            if (res.status === 200 || res.status === 201) {
                handleDeleteClose();
                setDeletedElement(null);
                getCategories();
            }
        } catch (error) {
            setDeleteLoading(false);
        }
    }

    const handleEdit = (category) => { 
        setEditedElement(category);
        setOpen(true);
    };

    const handleDelete = (category) => {
        handleDeleteOpen()
        setDeletedElement(category)
    }

    const getCategories = async () => {
        const data = await axios.get(urls.cantegories.getList);

        

        if (data.data.length) {
            setcategories(data.data);
        }
    };

    const handleFinish = async (values) => {
        if (!values.image) {
            values.image = "";
        }
        setPostLoading(true);
        try {
            console.log("urls ", urls);
            console.log("value ", values)
            console.log("editedElement ", editedElement);
            const res =
              editedElement !== null
                ? await Axios.patch(
                    urls.cantegories.updetal(editedElement.id),
                    values
                  )
                : await Axios.post(urls.cantegories.post, values);
            if (res.data.id) {
                handleClose();
                form.resetFields();
                getCategories();
            }
        } catch (error) {
            setPostLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (editedElement !== null) {
            form.setFieldsValue(editedElement);
        }
    }, [editedElement]);

    return (
      <>
        <Flex justify="space-between">
          <Typography.Title level="5">Kategoriyalar</Typography.Title>
          <Button type="primary" onClick={handleOpen}>
            + Qo'shish
          </Button>
        </Flex>
        <List
          bordered
          loading={!categories.length}
          dataSource={categories}
          renderItem={(item) => {
            return (
              <List.Item>
                <Space>
                  <Avatar
                    shape="square"
                    icon={
                      item.image?.trim().length <= 0 ? (
                        <FileImageOutlined />
                      ) : (
                        <Image
                          width={64}
                          height={64}
                          preview={false}
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                          src={item.image}
                        />
                      )
                    }
                  />
                  <Typography>{item.name}</Typography>
                </Space>
                <Space>
                  <Button onClick={() => handleEdit(item)}>O'zgartirish</Button>
                  <Button danger onClick={() => handleDelete(item)}>
                    O'chirish
                  </Button>
                </Space>
              </List.Item>
            );
          }}
        />
   
    
        <Modal
          title={
            editedElement !== null
              ? "Kategoriya o'zgartirish"
              : "Kategoriya qo'shish"
          }
          open={open}
          onOk={handleOk}
          onCancel={handleClose}
          okText={editedElement !== null ? "Saqlash" : "Qo'shish"}
          cancelText="Bekor qilish"
          okButtonProps={{
            loading: postLoading,
          }}
        >
          <Form
            defaultValue={{ name: "", image: "" }}
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              required
              label="Kategoriya nomi"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Kategoriya nomini kiriting!",
                },
              ]}
            >
              <Input placeholder="Mens" required />
            </Form.Item>
            <Form.Item label="Kategoriya rasmi" name="image">
              <Input type="url" />
            </Form.Item>
          </Form>
        </Modal>
        {deletedElement !== null && (
          <Modal
            title="Kategoriyani o'chirmoqchimisiz?"
            open={deleteModalOpen}
            onOk={handleDeleteModalOk}
            onCancel={handleDeleteClose}
            okText="Ha"
            cancelText="Yo'q"
            okButtonProps={{
              loading: deleteLoading,
              danger: true,
            }}
          >
            <Typography>
              Siz bu {deletedElement.name} kategoriyani o'chirmoqchimisz?
            </Typography>
          </Modal>
        )}
      </>
    );
}

export default Categories;
