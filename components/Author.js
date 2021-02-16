import { Avatar, Divider } from "antd";
import "../static/style/components/Author.css"
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg"></Avatar>
            </div>
            <div className="author-introduction">
                我是一个爱吃饭的猪，也爱睡觉，也爱发呆。非常可爱，人见人爱，技术一般，吹牛大王。
            </div>
            <Divider>社交账号</Divider>
            <Avatar size={28} icon={<GithubOutlined />} className="account"></Avatar>
            <Avatar size={28} icon={<QqOutlined />} className="account"></Avatar>
            <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
        </div>
    )
}
export default Author