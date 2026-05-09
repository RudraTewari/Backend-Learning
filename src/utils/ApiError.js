/*
    ApiError is a custom error class for backend APIs.

    It extends JavaScript's built-in Error class
    and adds extra API-related properties like:

    - statusCode -> HTTP status code (404, 401, 500, etc.)
    - success    -> false for all errors
    - data       -> usually null in error responses
    - errors     -> array of additional error details

    Purpose:
    Throw structured errors instead of plain Error objects.

    Instead of:
        throw new Error("User not found")
    we can do:
        throw new ApiError(404, "User not found")
    This makes error responses consistent across the backend.
*/
class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        /*
            Call parent Error constructor.

            This initializes built-in properties like:
            - message
            - stack
        */
        super(message)
        /*
            HTTP status code for API response.
            Example:
            404 -> Not Found
            401 -> Unauthorized
            500 -> Internal Server Error
        */
        this.statusCode=statusCode
        /* In error responses, data is usually null because request failed. */
        this.data=null
        /*  Store custom error message. */
        this.message=message
        /* All ApiError instances represent failure. */
        this.success=false;
        /*
            Array for extra error details.
            Example:
            [
                "Email is required",
                "Password too short"
            ]
        */
        this.errors=errors
        /*
            Stack trace helps debugging.

            If custom stack is provided, use it.
            Otherwise generate clean stack trace.
        */
        if(stack){
            this.stack=stack
        }else{
            /*
                Removes constructor noise from stack trace
                and points directly to where error occurred.
            */
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}