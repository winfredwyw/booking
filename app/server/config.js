/**
 * 数据库
 */
exports.DB_URL = (() => {
    process.env.DB_HOST = process.env.DB_HOST || 'localhost'
    process.env.DB_PORT = process.env.DB_PORT || 27017;
    process.env.DB_NAME = process.env.DB_NAME || 'booking';

    if (process.env.NODE_ENV != 'live'){
        return 'mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT;
    }	else {
        // prepend url with authentication credentials // 
        return 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+process.env.DB_PORT;
    }
})()