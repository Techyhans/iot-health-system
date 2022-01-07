import { Form, Input, Button, Checkbox } from 'antd';
import {useState} from "react";

export const BloodPressure = () => {

    const [text, setText] = useState('');

    const onFinish = (values) => {
        values['diabp'] = Math.round(73 + Math.random() * (120 - 73));
        values['sysbp'] = Math.round(105 + Math.random() * (147 - 105));
        values['heartrate'] = 1;
        values['age'] = Math.round(values['age']);
        values['sex'] = Math.round(values['sex']);
        values['height'] = parseFloat(values['height']);
        values['weight'] = parseFloat(values['weight']);
        values['bmi'] = parseFloat(values['bmi']);

        let data_to_submit = {
            "instances": [[ values['age'], values['sex'], values['sysbp'], values['diabp'], values['heartrate'], values['weight'], values['height'], values['bmi'] ]]
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(data_to_submit)
        };
        fetch('http://3.1.121.248:80/v1/models/half_plus_two:predict', requestOptions)
            .then(response => response.json())
            .then(data => {
                parseFloat(data['predictions'][0][0]) > 0.5 ? setText("You are healthy") : setText("Need Further Analysis")
            })
            .catch(error => alert('error', error));
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
            {
                text !== '' && (
                    <h1>Result: {text}</h1>
                )
            }
        </Form>
    )
}