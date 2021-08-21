import axios from "axios";

export function getLatestDataAPI () {
    return axios.get(process.env.REACT_APP_BASE_URL + '/sensor')
}

export function getAllDataAPI () {
    return axios.get(process.env.REACT_APP_BASE_URL + '/sensors')
}