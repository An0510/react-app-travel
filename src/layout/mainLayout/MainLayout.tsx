import * as React from 'react';
import styles from './MainLayout.module.css'
import {BusinessPartners, Carousel, Footer, Header, ProductCollection, SideMenu} from "../../components";

export const MainLayout: React.FC = ({children}) => {
    return (
        <>
            <Header/>
            {/* 页面内容 content */}
            <div className={styles["page-content"]}>
                {children}
            </div>
            <Footer/>
        </>
    );
};
