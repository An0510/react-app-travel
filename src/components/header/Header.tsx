import React, {useState, useEffect} from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import {Layout, Typography, Input, Menu, Button, Dropdown,Avatar} from "antd";
import {GlobalOutlined,UserOutlined} from "@ant-design/icons";
import {useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {
    addLanguageActionCreator,
    changeLanguageActionCreator
} from "../../redux/language/languageActions";
import {nanoid} from "nanoid";
import {useTranslation} from "react-i18next";
import jwtDecode, {JwtPayload as DefaultJwtPayload} from "jwt-decode";
import {userSlice} from "../../redux/user/slice";
import {getShoppingCart, shoppingCartSlice} from "../../redux/shoppingCart/slice";

interface JwtPayload extends DefaultJwtPayload {
    username: string
}

export const Header: React.FC = () => {
    const publicPath = "/travel"
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const match = useRouteMatch();
    const {t} = useTranslation()
    const language = useSelector((state) => state.language.language)
    const languageList = useSelector((state) => state.language.languageList)
    // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()
    const dispatch = useDispatch()
    const jwt = useSelector(s => s.user.token)
    const [username, setUsername] = useState("")
    const onLogout = () => {
        dispatch(userSlice.actions.logOut())
        history.push(`${publicPath}`)
    }
    const shoppingCartItem = useSelector(s => s.shoppingCart.items)
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

    useEffect(() => {
        if (jwt) {
            const token = jwtDecode<JwtPayload>(jwt)
            setUsername(token.username)
            dispatch(getShoppingCart(jwt))
        }
    }, [jwt])

    const menuClickHandler = (e) => {
        console.log(e);
        if (e.key === "new") {
            // ?????????????????????action
            dispatch(addLanguageActionCreator("?????????", nanoid()))
        } else {
            dispatch(changeLanguageActionCreator(e.key))
        }
    };

    return (
        <div className={styles["app-header"]}>
            {/* top-header */}
            <div className={styles["top-header"]}>
                <div className={styles.inner}>
                    <Typography.Text>??????????????????</Typography.Text>
                    <Dropdown.Button
                        style={{marginLeft: 15}}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map((l) => {
                                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                                })}
                                <Menu.Item key={"new"}>
                                    {t("header.add_new_language")}
                                </Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined/>}
                    >
                        {language === "zh" ? "??????" : "English"}
                    </Dropdown.Button>
                    {jwt ?
                        <Button.Group className={styles["button-group"]}>
                            <Avatar icon={<UserOutlined />} />
                            <span style={{marginLeft:"10px"}}>{username}</span>
                            <Button loading={shoppingCartLoading}
                                    style={{marginLeft:"15px"}}
                                    onClick={() => history.push(`${publicPath}/shoppingCart`)}
                            >{t("header.shoppingCart")}{shoppingCartItem.length}</Button>
                            <Button style={{marginLeft:"15px"}} onClick={() => onLogout()}>{t("header.signOut")}</Button>
                        </Button.Group>
                        :
                        <Button.Group className={styles["button-group"]}>
                            <Button onClick={() => history.push("/travel/register")}>??????</Button>
                            <Button onClick={() => history.push("/travel/signIn")}>??????</Button>
                        </Button.Group>}
                </div>
            </div>
            <Layout.Header className={styles["main-header"]}>
        <span onClick={() => history.push(publicPath)}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            React?????????
          </Typography.Title>
        </span>
                <Input.Search
                    placeholder={"????????????????????????????????????????????????"}
                    className={styles["search-input"]}
                />
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles["main-menu"]}>
                <Menu.Item key={1} onClick={() => history.push(publicPath)}>{t("header.home_page")}</Menu.Item>
                <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
                <Menu.Item key="3"> {t("header.group")} </Menu.Item>
                <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
                <Menu.Item key="5"> {t("header.private")} </Menu.Item>
                <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
                <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
                <Menu.Item key="8"> {t("header.local")} </Menu.Item>
                <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
                <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
                <Menu.Item key="11"> {t("header.study")} </Menu.Item>
                <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
                <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
                <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
                <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
                <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
            </Menu>
        </div>
    );
};
