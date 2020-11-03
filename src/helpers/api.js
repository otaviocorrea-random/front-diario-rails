export const apiUrl = 'https://api-diario-rails-otavio.herokuapp.com';
export const defaultRequest = {headers: {"Content-Type": "application/json"}};

export const api = async (url, callBack, method) => {
  await fetch(apiUrl + url, {method: (method || 'GET')})
    .then(callBack)
    .catch(err => {console.log(err)})
}

export const apiSubmit = async (url, callBack, request) => {
  request = {...defaultRequest, ...request}

  await fetch(apiUrl + url, request)
    .then(callBack)
    .catch(err => {console.log(err)})
}