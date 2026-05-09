/*
    ApiResponse is a helper class for sending
    consistent success responses from backend APIs.

    Purpose:
    Instead of manually writing response objects
    in every controller, create a standard format.

    Without this:
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })

    With ApiResponse:
        res.status(200).json(
            new ApiResponse(200, "User fetched successfully", user)
        )

    This keeps API responses clean and predictable.
*/

class ApiResponse {
    constructor(statusCode, message = "Success", data) {

        /*
            HTTP status code for response.
            Examples:
            200 -> OK
            201 -> Created
            204 -> No Content
        */
        this.statusCode = statusCode;

        /*
            Success message for client/frontend.

            Example:
            "Login successful"
            "User fetched successfully"
        */
        this.message = message;

        /*
            Actual response payload.

            Can contain:
            - user object
            - array of videos
            - tokens
            - anything returned by API
        */
        this.data = data;

        /*
            Automatically determines success status.
            Any status code below 400 is treated as success.
            Examples:
            200 -> true
            201 -> true
            404 -> false
            500 -> false
        */
        this.success = statusCode < 400;
    }
}

export { ApiResponse };