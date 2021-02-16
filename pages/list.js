import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { SmileOutlined } from '@ant-design/icons';
import "../static/style/pages/index.css"

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

const myList = (list) => {

  const [myList, setMyList] = useState(list.data)
  useEffect(() => {
    setMyList(list.data)
  })

  return (
    < div >
      <Head>
        <title>List</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a >视频教程</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a> {item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><SmileOutlined type="calendar"></SmileOutlined>{item.addTime}</span>
                    <span><SmileOutlined type="folder"></SmileOutlined>{item.typeName}</span>
                    <span><SmileOutlined type="fire"></SmileOutlined>{item.introduce}</span>
                  </div>
                  <div className="list-context">
                    {item.context}
                  </div>
                </List.Item>)}
            ></List>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={14} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>
      <Footer></Footer>
    </div >
  )
}

myList.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => {
        resolve(res.data)
      }
    )
  })

  return await promise
}
export default myList 