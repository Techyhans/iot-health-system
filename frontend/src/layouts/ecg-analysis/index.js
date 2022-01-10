import {Form, Input, Button, Checkbox} from 'antd';
import {useEffect, useState} from "react";

export const EcgAnalysis = () => {

    const [text, setText] = useState('');

    useEffect(() => {

        const data_to_submit = {
            "instances": [[ parseFloat(localStorage.getItem('ecg')) ]]
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(data_to_submit)
        };

        fetch('http://18.141.125.166:80/v1/models/half_plus_two:predict', requestOptions)
            .then(response => response.json())
            .then(data => {
                const class_list = ["No risk", "You have a minor problem, check with doctor", "You have a major problem, check with doctor", "You have a critical problem, check with doctor"]
                setText(class_list[data.predictions[0].indexOf(Math.max(...data.predictions[0]))])
            })
            .catch(error => alert('error', error));
    }, [localStorage.getItem('ecg')])

    return (
        <>
            <h1>ECY Analysis</h1>
            <h1>Result: {text}</h1>
        </>
    )
}