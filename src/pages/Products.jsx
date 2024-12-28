import React, { useEffect, useState } from "react";
import Axios from "../api";
import {
    Button,
    Drawer,
    Flex,
    Popconfirm,
    Space,
    Switch,
    Table,
    Typography,
} from "antd";
import ProductsDrawer from "../components/ProductsDrawer";
import { urls } from "../constants/urls";
import { Link } from "react-router-dom";
import Oldmax from "./Oldmax";

function Products() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const onClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const getProducts = async () => {
        const data = await Axios.get(urls.praducts.getList);
        setProducts(data.data);
    }

    const updateProduct = (id, name, value) => {
        Axios.patch(`/products/${id}`, {[name]: value}).then((res) => {
            if (res.status === 200) {
                getProducts();
                form.resetFields();
                onClose();
            }
        });
    };

    const columns = [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Narxi",
        render: (item) => (
          <div>
            {item.is_sale ? (
              <>
                <p>
                  <b>Asl narxi:</b> {item.old_price} so'm
                </p>
                <p>
                  <b>Chegirmadaki narxi:</b> {item.price} so'm
                </p>
              </>
            ) : (
              <p>
                <b>Asl narxi:</b> {item.old_price} so'm
              </p>
            )}
          </div>
        ),
      },
      {
        title: "Chegirma",
        render: (item) =>
          item.is_sale ? (
            <p>{item.discount}% lik chegirma</p>
          ) : (
            <p>Chegirma yo'q</p>
          ),
      },
      {
        title: "Yangimi?",
        render: (item) => (
          <Switch
            defaultChecked={item.is_new}
            checkedChildren="Ha"
            unCheckedChildren="Yo'q"
            onChange={(e) => updateProduct(item.id, "is_new", e)}
          />
        ),
      },
      {
        title: "Mashhurmi?",
        render: (item) => (
          <Switch
            defaultChecked={item.is_popular}
            onChange={(e) => updateProduct(item.id, "is_popular", e)}
            checkedChildren="Ha"
            unCheckedChildren="Yo'q"
          />
        ),
      },
      {
        title: "Action",
        key: "acttion",
        render: (value) => (
          <Space>
            <Button onClick={() => handleEdit(value)}>O'zgartirish</Button>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(value)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>O'chirish</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    const handleDelete = async (value) => {
        console.log(value)
        const data = await Axios.delete(urls.praducts.delete(value.id));
        if (data.status === 200) {
            getProducts();
        }
    };handleOpen

    const handleEdit = (data) => {
        setEditingData(data);
        setOpen(true);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
      <>
        <Flex justify="space-between">
          <Typography.Title level="5">Mahsulotlar</Typography.Title>
         
          <Button type="primary" onClick={handleOpen}>
            + Qo'shish
          </Button>
        </Flex>
        <Table columns={columns} dataSource={products} rowKey={"id"} />
        <ProductsDrawer
          onClose={onClose}
          open={open}
          getProducts={getProducts}
          editingData={editingData}
        />
      </>
    );
}

export default Products;
