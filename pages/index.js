import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { Row, Col, List } from 'antd'
import axios from 'axios'
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { SmileOutlined } from '@ant-design/icons';
import "../static/style/pages/index.css"
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Home = (list) => {
  const [myList, setMylist] = useState(list.data)

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,//启用类似github的样式
    pedantic: false,//容错，不保证marked完全正确
    sanitize: false,//原始输出，忽略html标签，
    tables: true,//允许输出github样式的表格
    breaks: false,//是否支持github的换行符
    smartLists: true,//列表样式
    smartypants: false,//
    highlight: function (code) {
      return hljs.highlightAuto(code).value;//
    }
  });

  return (
    < div >
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
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
                    <span><SmileOutlined type="fire"></SmileOutlined>{item.view_count}</span>
                  </div>
                  <div className="list-context"
                  dangerouslySetInnerHTML={{__html:item.introduce}}
                  >
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
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home