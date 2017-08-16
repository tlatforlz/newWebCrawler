var url = {
  dupplicate: 'DUPPLICATE_URL',
  notFound: 'NOT_FOUND_URL'
}

var spider = {
  dupplicate: 'DUPPLICATE_SPIDER',
  notFound: 'NOT_FOUND_SPIDER',
  urlDupplicate: 'URL_DUPPLICAATE'
}


var catelogy = {
  dupplicate: 'DUPPLICATE_CATELOGY',
  notFound: 'NOT_FOUND_CATELOGY'
}

var Archive = {
  dupplicate: 'DUPPLICATE_ARCHIVE',
  notFound: 'NOT_FOUND_ARCHIVE'
}

var news = {
  dupplicate: 'DUPPLICATE_NEWS',
  notFound: 'NOT_FOUND_NEWS',
  active: 'ACTIVE_NEWS_FAIL',
  deActive: 'DEACTIVE_NEWS_FAIL',
  error: 'SYSTEM_ERROR'
}
var user = {
  login: {
    input: 'ERROR_INPUT',
    systemErr: 'SYSTEM_ERROR',
    notFound: 'USER_NOT_FOUND',
    inCorrect: 'PASSWORD_INCORRECT'
  },
  signup: {
    input: 'ERROR_INPUT',
    systemErr: 'SYSTEM_ERROR',
    duplicateUser: 'DUPLICATE_USER'
  },
  register: {
    input: 'ERROR_INPUT'
  },
  changePassword: {
    systemErr: 'SYSTEM_ERROR',
    passwordOldNotCorrect: 'PASSWORD_OLD_NOT_CORRECT',
    input: "ERROR_INPUT"
  }
}

module.exports = {
  user: user,
  url: url,
  spider: spider,
  catelogy: catelogy,
  news: news,
  Archive: Archive
}
