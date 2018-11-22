var serviceControl = require('./service');
var controls = [].concat(serviceControl);

module.exports = function (app) {
    controls.forEach(item => {
        app[item.type](item.path, item.func);
    });
}