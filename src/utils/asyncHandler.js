/*
    asyncHandler is a higher-order function.

    It takes an async controller function (requestHandler)
    and returns a new function that Express can use as middleware.

    Purpose:
    Avoid writing try-catch blocks in every async route/controller.

    Without this:
        try {
            // async code
        } catch (error) {
            next(error)
        }

    would need to be repeated in every controller.
*/

const asyncHandler = (requestHandler) => {
    /*
        Return a middleware function with Express signature:
        req   -> request object
        res   -> response object
        next  -> passes control/error to next middleware
    */
    return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{next(err)})
        /*
                If any error occurs inside requestHandler
                (throw error / rejected promise),
                catch it and forward to Express error middleware.

                next(err) tells Express:
                "An error happened, skip normal middleware/routes
                and go to error-handling middleware."
            */
    }
}

export {asyncHandler}
//const aysncHandler = () =>
//const asyncHandler = () => {async (req,res,next)=>{}}
// const asyncHandler = () => async (req,res,next)=>{}
// const aysncHandler = (func) => async (req,res,next)=>{
//     try {
//         await func(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message : error.message
//         })
//     }
// }