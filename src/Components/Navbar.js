import React, { Component } from 'react';
import { Drawer, Button } from 'antd';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Navbar() {
    const [visible, setVisible] = React.useState(false)
    const [isLogedIn, setIsLogedIn] = React.useState(false)
    let history = useHistory();
    React.useEffect(() => {
        checkLoginUser()
    })
    const checkLoginUser = () => {
        if (localStorage.getItem("logedInUser")) {
            setIsLogedIn(true)
        }
    }
    const showDrawer = () => {
        setVisible(true)
    };
    const onClose = () => {
        setVisible(false)
    };
    const logout = () => {
        localStorage.removeItem("logedInUser")
        history.push("/")
    }
    return (
        <nav className="menuBar">
            <div className="logo">
                <Link to="/">GTECH Ventures</Link>
            </div>
            <div className="menuCon">
                <div className="rightMenu">
                    <Menu mode="horizontal">
                        {
                            isLogedIn ?
                                <Menu.Item key="logout" onClick={logout}>
                                    <p id="logout">Logout</p>
                                </Menu.Item>
                                :
                                <>
                                    <Menu.Item key="mail">
                                        <Link to="/login">Signin</Link>
                                    </Menu.Item>
                                    <Menu.Item key="app">
                                        <Link to="/signup">Signup</Link>
                                    </Menu.Item>
                                </>
                        }
                    </Menu>
                </div>
                <Button className="barsMenu" type="primary" onClick={showDrawer}>
                    <span className="barsBtn"></span>
                </Button>
                <Drawer
                    title="GTECH Ventures"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    {
                        isLogedIn ?
                            <Menu>
                                <Menu.Item key="logout" onClick={logout}>
                                    <p id="logout">Logout</p>
                                </Menu.Item>
                            </Menu>
                            :
                            <Menu>
                                <Menu.Item key="home">
                                    <Link to="/">Home</Link>
                                </Menu.Item>
                                <Menu.Item key="signin">
                                    <Link to="/login">Signin</Link>
                                </Menu.Item>
                                <Menu.Item key="signup">
                                    <Link to="/signup">Signup</Link>
                                </Menu.Item>
                            </Menu>
                    }

                </Drawer>

            </div>
        </nav>
    );
}

export default Navbar;