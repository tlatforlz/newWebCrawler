var url = {
  create: 'CREATE_SUCCESS',
  getAll: 'GET_ALL_SUCCESS',
  update: 'UPDATE_SUCCESS',
  get: 'GET_SUCCESS',
  delete: 'DELETE_SUCCESS'
}

var spider = {
  create: 'CREATE_SUCCESS',
  getAll: 'GET_ALL_SUCCESS',
  update: 'UPDATE_SUCCESS',
  get: 'GET_SUCCESS',
  delete: 'DELETE_SUCCESS',
  callSpider: 'CALL_SUCCESS'
}

var category = {
  create: 'CREATE_SUCCESS',
  getAll: 'GET_ALL_SUCCESS',
  update: 'UPDATE_SUCCESS',
  get: 'GET_SUCCESS',
  delete: 'DELETE_SUCCESS'
}

var Archive = {
  create: 'CREATE_SUCCESS',
  getAll: 'GET_ALL_SUCCESS',
  update: 'UPDATE_SUCCESS',
  get: 'GET_SUCCESS',
  delete: 'DELETE_SUCCESS'
}


var news = {
  create: 'CREATE_SUCCESS',
  getAll: 'GET_ALL_SUCCESS',
  update: 'UPDATE_SUCCESS',
  get: 'GET_SUCCESS',
  delete: 'DELETE_SUCCESS',
  active: 'ACTIVE_NEWS_SUCESS',
  deActive: 'DEACTIVE_NEWS_SUCCESS'
}
var user = {
  login: 'LOGIN_SUCESS',
  register: 'REGISTER_SUCCESS',
  signup: 'CREATE_SUCCESS',
  changePassword: 'CHANGE_SUCCESS',
  sendEmail: 'SEND_SUCCESS'
}

module.exports = {
  user: user,
  url: url,
  spider: spider,
  category: category,
  news: news,
  Archive: Archive
}
