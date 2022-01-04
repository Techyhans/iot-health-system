import { Form, Input, Button, Checkbox } from 'antd';

export const BloodPressure = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            // labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please input your age!' }]}
            >
                <Input type={"number"} />
            </Form.Item>

            <Form.Item
                label="Sex (0 - Female 1 - Male)"
                name="sex"
                rules={[{ required: true, message: 'Please input your sex!' }]}
            >
                <Input type={"number"} />
            </Form.Item>

            <Form.Item
                label="Height (40-200 cm limit)"
                name="height"
                rules={[{ required: true, message: 'Please input your height!' }]}
            >
                <Input type={"number"} />
            </Form.Item>

            <Form.Item
                label="Weight (30-130 kg limit)"
                name="weight"
                rules={[{ required: true, message: 'Please input your weight!' }]}
            >
                <Input type={"number"} />
            </Form.Item>

            <Form.Item
                label="BMI (weightKg / heightCm / heightCm * 10000)"
                name="bmi"
                rules={[{ required: true, message: 'Please input your BMI!' }]}
            >
                <Input type={"number"} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}