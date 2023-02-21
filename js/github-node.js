require("dotenv").config()
const axios = require("axios")
const urlPs = require("url")
const base64 = require("base-64")

const setHeader = (url, api_key) => {
  const parseURL = urlPs.parse(url)
  return {
    origin: `${parseURL.protocol}//${parseURL.host}`,
    referer: url,
    "user-agent": `Node.js/${process.versions.node}`,
    "sec-ch-ua": '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    "user-agent": "Mzea HTTP Request/0.04.0",
    "connection": "Keep-Alive",
    accept: "application/json",
    "authorization": `Bearer ${api_key}`
  }
}

const codeRespon = {
  get: {
    200: {
      message: "Ok",
      isError: false
    },
    302: {
      message: "Found !",
      isError: false
    },
    404: {
      message: "Resource Not Found !",
      isError: false
    },
    403: {
      message: "Forbidden",
      isError: true
    }
  },
  put: {
    200: {
      message: "Ok",
      isError: false
    },
    201: {
      message: "Create",
      isError: false
    },
    404: {
      message: "Resource Not Found !",
      isError: false
    },
    409: {
      message: "Conflict",
      isError: true
    },
    409: {
      message: "Validation failed, or the endpoint has been spammed.",
      isError: true
    }
  },
  delete: {
    200: {
      message: "Ok",
      isError: false
    },
    201: {
      message: "Create",
      isError: false
    },
    404: {
      message: "Resource Not Found !",
      isError: false
    },
    409: {
      message: "Conflict",
      isError: true
    },
    409: {
      message: "Validation failed, or the endpoint has been spammed.",
      isError: true
    }
  }
}

const requestGithub = ({ username, repository }) => {
  async function toRequestGithub(_path, _method, _body) {
    const urls = `https://api.github.com/repos/${username}/${repository}/contents`
    try {
      const rhttp = await axios({
        method: _method,
        headers: setHeader(`${urls}/${_path}`),
        data: JSON.stringify(_body)
      })

      return {
        isError: false,
        message: "OK",
        headers: rhttp.headers,
        data: rhttp.data
      }
    }catch(err) {
      const response = err.response
      if(!response) {
        return {
          isError: true,
          message: "None Response !"
        }

      }
      return {
        isError: true,
        message: codeRespon[_method?.toLowerCase()][response.status]?.message || response.statusText,
        headers: response.headers,
        data: response.data
      }
    }
  }

  return {
    get: async function get(__path) {
      if(!__path) {
        throw new Error("No Path !")
      }
      const request = await toRequestGithub(__path, "GET")
      if(request.isError) {
        throw new Error(`Git Error ${request?.data?.message || request.message}`)
      }
      return request
    },
    put: async function put(__path, { content, message, sha }) {
      if(!__path) {
        throw new Error("No Path !")
      }
      const request = await toRequestGithub(__path, "PUT", {
        sha,
        message,
        content: base64.encode(content)
      })
      if(request.isError) {
        throw new Error(`Git Error ${request?.data?.message || request.message}`)
      }
      return request
    },
    delete: async function deleted(__path) {
      if(!__path) {
        throw new Error("No Path !")
      }
      const request = await toRequestGithub(__path, "DELETE")
      if(request.isError) {
        throw new Error(`Git Error ${request?.data?.message || request.message}`)
      }
      return request
    },
  }
}

module.exports = {
  setHeader,
  requestGithub
}
