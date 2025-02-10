import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";

function Layout(props) {
    return (
        <>
        <Header />
            <MainNav />
            {/*outlet la ou s'affuchent les pages enfants*/}
            <Outlet />
            <MainFooter />
        </>
    );
}

export default Layout;