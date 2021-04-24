import { Spin, Space } from 'antd';

const Loader=()=>{
    return (
        <Space size="large" style={{
            position:'absolute',
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)'
        }}>
            <Spin size="large" />
        </Space>
    )
}

export default Loader