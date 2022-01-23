import React from "react";
import styles from "./Carousel.module.css";
import { Image, Carousel as AntCarousel } from 'antd';

export const Carousel : React.FC = () => {
  return (
    <AntCarousel autoplay className={styles.slider}>
      <Image src={'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/carousel_1.jpg'} />
      <Image src={'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/carousel_3.jpg'} />
      <Image src={'https://typora-an.oss-cn-hangzhou.aliyuncs.com/%E5%89%8D%E7%AB%AF/carousel_2.jpg'} />
    </AntCarousel>
  );
}
