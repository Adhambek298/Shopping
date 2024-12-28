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
import Axios from "../api/index";
import { urls } from "../constants/urls";

function Brands() {
    const [brands, setBrands] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [postLoading, setPostLoading] = useState(false);
    const [editedElement, setEditedElement] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletedElement, setDeletedElement] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleDeleteOpen = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteModalOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        form.resetFields();
        postLoading(false);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleDeleteModalOk = async () => {
        setDeleteLoading(true);
        try {
            const res = await Axios.delete(
                urls.brands.delete(deletedElement.id)
            );
            if (res.status === 200 || res.status === 201) {
                handleDeleteClose();
                setDeletedElement(null);
                getBrands();
            }
        } catch (error) {
            setDeleteLoading(false);
        }
    };

    const handleEdit = (brand) => {
        setEditedElement(brand);
        setOpen(true);
    };

    const handleDelete = (brand) => {
        handleDeleteOpen();
        setDeletedElement(brand);
    };

    const getBrands = async () => {
        const data = await Axios.get(urls.brands.getList);

        if (data.data.length) {
            setBrands(data.data);
        }
    }

    const handleFinish = async (values) => {
        setPostLoading(true);
        try {
            console.log("editedElement ", editedElement);
            const res =
              editedElement !== null
                ? await Axios.patch(
                    urls.brands.updeta(editedElement.id),
                    values
                  )
                : await Axios.post(urls.brands.post, values);
            if (res.data.id) {
                handleClose();
                form.resetFields();
                getBrands();
                postLoading(false);
            }
        } catch (error) {
            setPostLoading(false);
        }
    };

    useEffect(() => {
        getBrands();
    }, []);

    useEffect(() => {
        if (editedElement !== null) {
            form.setFieldsValue(editedElement);
        }
    }, [editedElement]);

    return (
        <>
            <Flex justify='space-between'>
                <Typography.Title level='5'>Brendlar</Typography.Title>
                <Button type='primary' onClick={handleOpen}>
                    + Qo'shish
                </Button>
            </Flex>

            <List
                bordered
                loading={!brands.length}
                dataSource={brands}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Space>
                                <Avatar
                                    shape='square'
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
                                <Button onClick={() => handleEdit(item)}>
                                    O'zgartirish
                                </Button>
                                <Button
                                    danger
                                    onClick={() => handleDelete(item)}
                                >
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
                        ? "Brend o'zgartirish"
                        : "Brend qo'shish"
                }
                open={open}
                onOk={handleOk}
                onCancel={handleClose}
                okText={editedElement !== null ? "Saqlash" : "Qo'shish"}
                cancelText='Bekor qilish'
                okButtonProps={{
                    loading: postLoading,
                }}
            >
                <Form
                    defaultValue={{ name: "", image: "" }}
                    form={form}
                    layout='vertical'
                    onFinish={handleFinish}
                >
                    <Form.Item
                        required
                        label='Brend nomi'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: "Brend nomini kiriting!",
                            },
                        ]}
                    >
                        <Input placeholder='Apple' required />
                    </Form.Item>
                    <Form.Item
                        label='Brend rasmi'
                        name='image'
                        rules={[
                            {
                                required: true,
                                message: "Brend nomini kiriting!",
                            },
                        ]}
                    >
                        <Input type='url' />
                    </Form.Item>
                </Form>
            </Modal>

            {deletedElement !== null && (
                <Modal
                    title="Brendni o'chirmoqchimisiz?"
                    open={deleteModalOpen}
                    onOk={handleDeleteModalOk}
                    onCancel={handleDeleteClose}
                    okText='Ha'
                    cancelText="Yo'q"
                    okButtonProps={{
                        loading: deleteLoading,
                        danger: true,
                    }}
                >
                    <Typography>
                        Siz bu {deletedElement.name} brendni o'chirmoqchimisz?
                    </Typography>
                </Modal>
            )}
        </>
    );
}

export default Brands;
