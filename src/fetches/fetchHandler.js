import axios from 'axios'

const fetchHandler = async (url, method, pathName, body, headers) => {
  return axios({
    method,
    url: `${url}/${pathName}`,
    data: body,
    headers
  })
    .then((response) => {
      return {isSuccess: true, data: response.data}
    })
    .catch((error) => {
      return {isSuccess: false, error: error.response.data}
    })
}

export default fetchHandler
