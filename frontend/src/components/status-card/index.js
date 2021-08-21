import { Card, Typography } from 'antd';

const { Title } = Typography;

function StatusCard ({ title, value, unit }) {
    return (
        <>
            <Card title={title} bordered={false}>
              <Typography>
                <Title>{value} {unit}</Title>
              </Typography>
            </Card>
        </>
    )
}

export default StatusCard