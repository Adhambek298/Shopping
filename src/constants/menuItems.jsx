import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const menuItems = [
    {
        key: 1,
        icon: <HomeOutlined />,
        path: "/",
        label: <Link to="/">Asosiy</Link>,
    },
    {
        key: 2,
        icon: <AppstoreOutlined />,
        path: "/categories",
        label: <Link to="/categories">Kategoriyalar</Link>,
    },
    {
        key: 3,
        icon: <HomeOutlined />,
        path: "/products",
        label: <Link to="/products">Mahsulotlar</Link>,
    },
    {
        key: 4,
        icon: <HomeOutlined />,
        path: "/brands",
        label: <Link to="/brands">Brendlar</Link>,
    },
    {
        key: 5,
        icon: <HomeOutlined />,
        path: "/banners",
        label: <Link to="/banners">Bannerlar</Link>,
    },
    {
        key: 6,
        icon: <HomeOutlined />,
        path: "/users",
        label: <Link to="/users">Foydalanuvchilar</Link>,
    },
    {
        key: 7,
        icon: <HomeOutlined />,
        path: "/orders",
        label: <Link to="/orders">Buyurtmalar</Link>,
    },
];
