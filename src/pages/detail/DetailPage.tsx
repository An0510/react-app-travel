import React, {useEffect, useState,} from "react";
import {RouteComponentProps, useParams} from "react-router-dom";
import axios from "axios";
import {Spin, Row, Col, Button, DatePicker, Space, Divider, Typography, Anchor, Menu} from "antd";
import styles from "./DetailPage.module.css";
import {Header, Footer, ProductIntro, ProductComments} from "../../components";
import {commentMockData} from './mockup'
import {nanoid} from "nanoid";
import {productDetailSlice, getProductDetail} from "../../redux/productDetail/slice";
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {MainLayout} from "../../layout/mainLayout";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {addShoppingCartItem} from "../../redux/shoppingCart/slice";

interface MatchParams {
    touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
    props
) => {
    const {touristRouteId} = useParams<MatchParams>()
    // const [loading, setLoading] = useState<boolean>(true)
    // const [product, setProduct] = useState<any>(null)
    // const [error, setError] = useState<string | null>(null)
    const {RangePicker} = DatePicker;
    const jwt = useSelector(s => s.user.token) as string
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

    const loading = useSelector(state => state.productDetail.loading)
    const error = useSelector(state => state.productDetail.error)
    const product = useSelector(state => state.productDetail.data)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProductDetail(touristRouteId))
    }, [])
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
    return <>
        <MainLayout>
            {/*产品简介和日期选择*/}
            <div className={styles['product-intro-container']}>
                <Row>
                    <Col span={13}>
                        <ProductIntro
                            title={product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map((p) => p.url)}
                        />
                    </Col>
                    <Col span={11}>
                        <Button
                            loading={shoppingCartLoading}
                            style={{
                                marginTop: "25px",
                                marginRight: "15px",
                                display: "block",
                                backgroundColor: "#1976D2",
                                color: "white"
                            }}
                            onClick={() => {
                                dispatch(addShoppingCartItem({jwt, touristRouteId: product.id}))
                            }}
                        ><ShoppingCartOutlined/>添加购物车</Button>
                        <RangePicker open style={{marginTop: 20}}/>
                    </Col>
                </Row>
            </div>
            {/*锚点菜单*/}
            <Anchor className={styles["product-detail-anchor"]}>
                <Menu mode="horizontal">
                    <Menu.Item key={nanoid()}>
                        <Anchor.Link href="#feature" title="产品特色"/>
                    </Menu.Item>
                    <Menu.Item key={nanoid()}>
                        <Anchor.Link href="#fees" title="费用"/>
                    </Menu.Item>
                    <Menu.Item key={nanoid()}>
                        <Anchor.Link href="#notes" title="预订须知"/>
                    </Menu.Item>
                    <Menu.Item key={nanoid()}>
                        <Anchor.Link href="#comments" title="用户评价"/>
                    </Menu.Item>
                </Menu>
            </Anchor>
            {/*产品特色*/}
            <div id='feature' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        产品特色
                    </Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{__html: product.features}}
                    style={{margin: 50}}
                />
            </div>
            {/*费用*/}
            <div id='fees' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        费用
                    </Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{__html: product.fees}}
                    style={{margin: 50}}
                />
            </div>
            {/*预定需知*/}
            <div id='notes' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        预定需知
                    </Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{__html: product.notes}}
                    style={{margin: 50}}
                />
            </div>
            {/*产品评价*/}
            <div id='comments' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>
                        用户评价
                    </Typography.Title>
                </Divider>
                <ProductComments data={commentMockData}/>
            </div>
        </MainLayout>
    </>;
};
