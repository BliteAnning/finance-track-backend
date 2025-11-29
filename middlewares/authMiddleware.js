import jwt from 'jsonwebtoken'


const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.replace('Bearer ', '');

        if(!token){
            return res.status(200).json({
                message: "user not authorized",
                error: true,
                success: false
            })
        }


        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            console.log(err)
           // console.log("decoded",decoded) // bar

            if(err){
                console.log(err)
            }

            req.userId = decoded?.id;
            next();
        });
        
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
            data: []
        })
    }
}
export default authMiddleware;