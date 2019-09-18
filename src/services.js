import axios from 'axios'
import * as constants from './constants'

let login = (data) => {
  return axios({
    method: 'POST',
    url: constants.signinUrl,
    data
  })
}

let getFlips = () => {
    return axios({
      method: 'GET',
      url: constants.flipsUrl
    })
}

let getSubjects = () => {
    return axios({
      method: 'GET',
      url: constants.subjectsUrl
    })
}

let addSubject = (data) => {
    return axios({
      method: 'POST',
      url: constants.subjectsUrl,
      data
    })
}

let addFlips = (data) => {
    return axios({
      method: 'POST',
      url: constants.flipsUrl,
      data
    })
}

export default {
    login,
    getFlips,
    getSubjects,
    addSubject,
    addFlips,
}