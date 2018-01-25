const check = require('check-types');
const Todo = require('../models/todo');

/*** IMPORT **/

function checkProperties (body) {
    const request = {
        name: body.name,
        description: body.desciption,
        priority: body.priority
    };

    const checkType = {
        name: check.string,
        description: check.string,
        priority: check.number
    };

    const params = check.map(request, checkType);

    for ( let param of Object.values(params)){
        if(!param) {
            return false;
        }
        return true;
    }

}

module.exports = {
    checkProperties: checkProperties
};