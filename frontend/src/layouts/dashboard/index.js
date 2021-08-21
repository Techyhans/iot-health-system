import { Row, Col } from 'antd';
import StatusCard from "../../components/status-card";
import { getLatestDataAPI } from "../../shared/cardData";
import {useEffect, useState} from "react";


function Dashboard () {
    const [sensorValue, setSensorValue] = useState({})

    useEffect(() => {
        setInterval(() => {
            Promise.all([getLatestDataAPI()])
              .then((results) => {
                  setSensorValue(results[0].data)
              }).catch((error) => {
                  console.log('Error Getting Latest Data', error)
            });
        }, 1000)
    }, [])

    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <StatusCard title={'Body Temperature'} value={sensorValue['bodyTemp']} unit={'Celsius'} />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <StatusCard title={'Room Temperature'} value={sensorValue['roomTemp']} unit={'Celsius'} />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <StatusCard title={'Ecg Data'} value={sensorValue['ecgData']} unit={''} />
                </Col>
            </Row>
        </>
    )
}

export default Dashboard