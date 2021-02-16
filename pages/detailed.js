import Head from 'next/head'
import React from 'react'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import axios from 'axios'
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import '../static/style/pages/Detailed.css';
import { SmileOutlined } from '@ant-design/icons';
import 'markdown-navbar/dist/navbar.css'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from "../components/tocify.tsx";
import servicePath from '../config/apiUrl'

const Detailed = (props) => {
  const tocify = new Tocify();
  const renderer = new marked.Renderer();
  // ### sss
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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

  let html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>Detailed</title>
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
                  <a href="/">视频列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a>嘻嘻嘻</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                React最新技术前沿，新闻零距离（今天）
            </div>
              <div className="list-icon center" >
                <span><SmileOutlined type="calendar"></SmileOutlined>2020-1-4</span>
                <span><SmileOutlined type="folder"></SmileOutlined>视频教程</span>
                <span><SmileOutlined type="fire"></SmileOutlined>8888</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={14} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {

    axios(servicePath.getArticleById + id).then(
      (res) => {
        // console.log(title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}
export default Detailed