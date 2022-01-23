import React from "react";
import {
    Header,
    Footer,
    Carousel,
    SideMenu,
    ProductCollection,
    BusinessPartners,
} from "../../components";
import {Row, Col, Typography, Spin} from "antd";
import styles from "./HomePage.module.css";
import {withTranslation, WithTranslation} from "react-i18next";
import axios from "axios";
import { connect } from "react-redux";
import {RootState} from "../../redux/store";
import {giveMeDataActionCreator} from "../../redux/recommandProducts/recommandProductsActions";
import {MainLayout} from "../../layout/mainLayout";

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        giveMeData: () => {
            dispatch(giveMeDataActionCreator())
        }
    }
}

type PropType = WithTranslation
    & ReturnType<typeof mapStateToProps>
    & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropType> {

    componentDidMount() {
        this.props.giveMeData()
    }

    render() {
        // console.log(this.props.t)
        const {t} = this.props;
        const {productList, loading, error} = this.props
        if (loading) {
            return (<Spin
                    size="large"
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%"
                    }}
                />
            );
        }
        if (error) {
            return <div>网站出错:{error}</div>
        }
        return (
            <>
                <MainLayout>
                    <Row style={{marginTop: 20}}>
                        <Col span={6}>
                            <SideMenu/>
                        </Col>
                        <Col span={18}>
                            <Carousel/>
                        </Col>
                    </Row>
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="warning">
                                {t("home_page.hot_recommended")}
                            </Typography.Title>
                        }
                        sideImage={'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/sider_2019_02-04.png'}
                        products={productList[0].touristRoutes}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="danger">
                                {t("home_page.new_arrival")}
                            </Typography.Title>
                        }
                        sideImage={'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/sider_2019_02-04-2.png'}
                        products={productList[1].touristRoutes}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="success">
                                {t("home_page.domestic_travel")}
                            </Typography.Title>
                        }
                        sideImage={'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/sider_2019_12-09.png'}
                        products={productList[2].touristRoutes}
                    />
                    <BusinessPartners/>
                </MainLayout>
            </>
        );
    }
}

export const HomePage = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(HomePageComponent))
