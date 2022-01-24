import * as React from 'react';
import {PaymentForm, CheckOutCard} from '../../components'
import {MainLayout} from "../../layout/mainLayout";
import {Row, Col} from "antd"
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {createOrder, orderSlice} from "../../redux/order/slice";

interface Props {

};
export const Order: React.FC = () => {
    const jwt = useSelector(s => s.user.token) as string
    const loading = useSelector(s => s.order.loading)
    const order = useSelector(s => s.order.currentOrder)
    const dispatch = useDispatch()

    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm/>
                </Col>
                <Col span={12}>
                    <CheckOutCard
                        loading={loading}
                        order={order}
                        onCheckout={() => {
                            dispatch(createOrder({jwt,orderId:order.id}))
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
};
