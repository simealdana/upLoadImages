import MessageError from "../models/Error";

export const errorMessage = (status):MessageError => {
    const error = new MessageError();

    switch (status) {
        case 400:
            error.message = "Bad request";
            error.status = status;
            break;
        case 401:
            error.message = "Unauthorized";
            error.status = status;
            break;
        case 403:
            error.message = "Unauthorized";
            error.status = status;
            break;
        case 404:
            error.message = "Not found";
            error.status = status;
            break;
        case 500:
            error.message = "Internal server error";
            error.status = status;
            break;
    
        default:
            error.message = "Internal server error";
            error.status = status;
            break;
    }
    return error;
}










