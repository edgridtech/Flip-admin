import axios from 'axios'
import * as constants from './constants'
import store from './store'

let login = (data) => {
  return axios({
    method: 'POST',
    url: constants.signinUrl,
    data
  })
}

let getFlips = () => {
  axios({
    method: 'GET',
    url: constants.flipsUrl
  })
    .then(flips => {
      store.commit('saveFlips', flips.data.flips)
    })
}

let getSubjects = () => {
  axios({
    method: 'GET',
    url: constants.subjectsUrl
  })
    .then(subjects => {
      store.commit('saveSubjects', subjects.data.subjects)
    })
}

let addSubject = (data) => {
  return axios({
    method: 'POST',
    url: constants.subjectsUrl,
    data
  })
}

let editSubject = (data) => {
  return axios({
    method: 'PUT',
    url: constants.subjectsUrl,
    data
  })
}

let deleteSubject = (data) => {
  return axios({
    method: 'DELETE',
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

let uploadImage = (file) => {

  let data = new FormData()
  data.append('file', file)
  return axios({
    method: 'post',
    url: constants.imageUpload,
    headers: {
      'content-type': 'multipart/form-data'
    },
    data
  })
}

export default {
  login,
  getFlips,
  getSubjects,
  addSubject,
  editSubject,
  deleteSubject,
  addFlips,
  uploadImage
}