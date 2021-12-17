module.exports = {
    userDoesNotExistAlready,
    hashThePassword,
    reqBodyisPerfect,
}

function userDoesNotExistAlready(req, res, next) {
    console.log("userDoesNotExistAlready")
    next()
}

function hashThePassword(req, res, next) {
    console.log("hashThePassword")
    next()
}

function reqBodyisPerfect(req, res, next) {
 console.log("reqBodyisPerfect")  
 next() 
}