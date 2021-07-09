const {  HTTP_STATUS } = require('./constants.js');

const pipe = (...fns) => {
    return param => fns.reduce(
        (result,fn) => (result.then && result.then(fn)) || fn(result),param
    )
}

const successResponse = (data, httpStatusCode, successMessage = '') => {
    if (!data || !httpStatusCode) {
        console.error( `Success response has either no data=${data} or httpStatusCode=${httpStatusCode}`);
    }
    return {
        data: data,
        status: httpStatusCode ? httpStatusCode : HTTP_STATUS.OK,
        message: successMessage,
        success: true
    };
};

const errorResponse = (httpStatusCode, errorMessage, data = null) => {
    if (!httpStatusCode || !errorMessage) {
        console.error( `Error response has either no errorMessage=${errorMessage} or httpStatusCode=${httpStatusCode}`);
    }
    return {
        data,
        status: httpStatusCode ? httpStatusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: errorMessage ? errorMessage : 'Internal server error. Please try again later.',
        success: false
    };
};

const internalServerErrorResponse = message => {
    if(!message) message='Internal server error.Please try again later.'
    return errorResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
}


const constructResponse = (expressResponseObject, responseData) => {
    if (responseData.success) {
        return expressResponseObject.status(responseData.status).send({
            data: responseData.data,
            message: responseData.message,
            success: true
        });
    } else {
        if (responseData.data) {
            return expressResponseObject.status(responseData.status).send({
                data: responseData.data,
                message: responseData.message,
                success: false,
            });
        }
        return expressResponseObject.status(responseData.status).send({
            message: responseData.message,
            success: false,
        });
    }
};

const logBadRequestAndResponse = (expressRequestObject, expressResponseObject, errors) => {
    const loggerMessage = `${expressRequestObject.method} ${
        expressRequestObject.originalUrl
        } RequestBody:${JSON.stringify(expressRequestObject.body)} Validation Errors: ${JSON.stringify(
            errors,
        )}`;
    console.error(loggerMessage);
    return expressResponseObject.status(HTTP_STATUS.BAD_REQUEST).json({
        errors: errors.array({
            onlyFirstError: true
        })
    });
};

const createCustomError = (status,message) =>{
    const error = new Error(message);
    error.isCustom = true;
    error.status = status;
    return error;
}
module.exports = {
    successResponse,
    errorResponse,
    constructResponse,
    logBadRequestAndResponse,
    internalServerErrorResponse,
    createCustomError,
    pipe
};