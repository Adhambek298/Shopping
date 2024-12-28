import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Switch,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Axios from "../api";
import { urls } from "../constants/urls";

function ProductsDrawer({ onClose, open, getProducts, editingData }) {
    const { TextArea } = Input;
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [brandsLoading, setBrandsLoading] = useState(false);
    const [form] = Form.useForm();
    const isSale = Form.useWatch("is_sale", form);

    const getCategories = () => {
        setCategoriesLoading(true);
        Axios.get(urls.praducts.getList)
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => console.log("Error fetching categories!", err))
          .finally(() => setCategoriesLoading(false));
    };

    const getBrands = () => {
        setBrandsLoading(true);
        Axios.get(urls.praducts.getList)
          .then((res) => {
            setBrands(res.data);
          })
          .catch((err) => console.log("Error fetching categories!", err))
          .finally(() => setBrandsLoading(false));
    };

    const addProduct = (value) => {
        Axios.post(urls.praducts.post, value).then((res) => {
          if (res.status === 201) {
            getBrands();
            getCategories();
            form.resetFields();
            onClose();
          }
        });
    };

    const handleFinish = (value) => {
        let obj = {
            name: value.name,
            review_count: value.review_count,
            star_count: value.star_count,
            price:value.is_sale ? value.price - (value.price / 100 * value.discount) : value.price,
            old_price: value.is_sale ? value.price : 0,
            discount: value.discount,
            is_sale: value.is_sale,
            description: value.description,
            images: value.images,
            categorie_id: value.categorie_id,
            brand_id: value.brand_id,
            is_new: value.is_new && false,
            is_popular: value.is_popular && false
        };

        editingData ? handleEdit(obj) : addProduct(obj);
    };

    const handleEdit = async (value) => {
        Axios.patch(`/Products/${editingData.id}`, value).then((res) => {
          if (res.status === 200) {
            getProducts();
            form.resetFields();
            onClose();
          }
        });
    };

    useEffect(() => {
        form.setFieldsValue(editingData);
        form.setFieldValue("categorie_id", editingData?.categorie_id);
        form.setFieldValue("brand_id", editingData?.brand_id);
    }, [editingData]);

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    return (
        <Drawer
            width='35%'
            title="Mahsulot qo'shish"
            onClose={onClose}
            open={open}
        >
            <Form form={form} layout='vertical' onFinish={handleFinish}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            required
                            label='Mahsulot nomi'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: "Mahsulot nomini kiriting!",
                                },
                            ]}
                        >
                            <Input placeholder='Apple' required />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            required
                            label='Tavsif'
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: "Tavsifni kiriting!",
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12, 12]}>
                    <Col span={8}>
                        <Form.Item
                            required
                            label='Narxi'
                            name='price'
                            rules={[
                                {
                                    required: true,
                                    message: "Narxni kiriting!",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} required />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label='Chegirmadami?'
                            name='is_sale'
                        >
                            <Switch required />
                        </Form.Item>
                    </Col>

                    {isSale && (
                        <Col span={8}>
                            <Form.Item
                                required
                                label='Chegirma'
                                name='discount'
                            >
                                <InputNumber
                                    addonAfter='%'
                                    controls={false}
                                    max={100}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Form.Item>
                        </Col>
                    )}
                </Row>

                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <Form.Item
                            required
                            label="Ko'rishlar soni"
                            name='review_count'
                            rules={[
                                {
                                    required: true,
                                    message: "Ko'rishlar soni kiriting!",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} required />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            required
                            label='Yulduzlar soni'
                            name='star_count'
                            rules={[
                                {
                                    required: true,
                                    message: "Yulduzlar soni kiriting!",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} required />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <Form.Item
                            label='Mahsulot kategoriyasi'
                            name='categorie_id'
                        >
                            <Select
                                loading={categoriesLoading}
                                options={categories.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Mahsulot brendi' name='brand_id'>
                            <Select
                                options={brands.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                                loading={brandsLoading}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.List
                    name='images'
                    initialValue={[""]}
                    style={{ width: "100%" }}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    className='space-block'
                                    key={key}
                                    style={{
                                        display: "flex",
                                        marginBottom: 8,
                                        width: "100%",
                                    }}
                                    align='baseline'
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name]}
                                        style={{ flex: 1 }}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Mahsulot rasmini kiriting!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{ width: "100%" }}
                                            type='url'
                                            placeholder='Mahsulot rasmi'
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                    />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type='dashed'
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Rasm qo'shish
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Button
                    htmlType='submit'
                    type='primary'
                    style={{ width: "100%" }}
                >
                    Submit
                </Button>
            </Form>
        </Drawer>
    );
}

export default ProductsDrawer;
