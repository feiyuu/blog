import React, { useState, useEffect } from "react";
import "../static/style/components/header.css";
import { Row, Col, Menu } from "antd";
import { Icon } from "@ant-design/compatible";
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
  const [navArray, setNavArray] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          setNavArray(res.data.data)
          return res.data.data
        }
      )
      setNavArray(result)
    }
    fetchData()
  }, [])

  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        {/* xs 小于756像素 sm 大于等于576 md 大于等于768 lg 992 xl 1200*/}
        <Col xs={24} sm={24} md={16} lg={18} xl={14}>
          <span className="header-logo">新浪微博</span>
          <span className="header-txt">专注于新闻第一线</span>
        </Col>
        <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={7}>
          <Menu
            mode="horizontal"
            onClick={handleClick}
          >
            <Menu.Item key="0">
              <Icon type="home" />
              博客首页
            </Menu.Item>
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.Id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default Header;
