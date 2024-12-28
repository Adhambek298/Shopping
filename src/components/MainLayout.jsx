import React from "react";
import { Card, Layout, Menu } from "antd";
import { menuItems } from "../constants/menuItems";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import Brands from "../pages/Brands";
import Banners from "../pages/Banners";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Oldmax from "../pages/Oldmax";

const App = () => {
  const {pathname} = useLocation()
  const { Header, Content, Footer, Sider } = Layout;

  
 

  return (
      <Layout hasSider>
        <Sider className="sider-style">
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={String(
              menuItems.find((el) => el.path === pathname).key
            )}
            items={menuItems}
          />
        </Sider>
        <Layout
          style={{
            marginInlineStart: 200,
          }}
        >
          <Header className="header" />
          <Content className="main-content">
            <Card className="main-content__card">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/banners" element={<Banners />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/Oldmax" element={<Oldmax />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Card>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Exclusive ©{new Date().getFullYear()} Created by Frontend team
          </Footer>
        </Layout>
      </Layout>
    );
};
export default App;
