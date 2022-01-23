import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import styles from "./BusinessPartners.modules.css";

const companies = [
    { src: 'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/microsoft-80658_640.png', title: "Microsoft"},
    { src: 'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/icon-720944_640.png', title: "Youtube"},
    { src: 'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/follow-826033_640.png', title: "Ins"},
    { src: 'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/facebook-807588_640.png', title: "Facebook"}
]

export const BusinessPartners: React.FC = (props) => {
  return (
    <div className={styles.content}>
      <Divider orientation="left">
        <Typography.Title level={3}>合作企业</Typography.Title>
      </Divider>
      <Row>
        {companies.map((c, index) => (
          <Col span={6} key={"bussiness-partner-" + index}>
            <img
              alt="bussiness-partner"
              src={c.src}
              style={{
                width: "80%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
