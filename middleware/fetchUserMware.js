const jwt = require('jsonwebtoken')
const SECRET_KEY  = process.env.SECRET_KEY

const fetchUserMware = (req, res, next) => {
    const token = req.header('auth-token')
    // console.log(token);
    if (!token) {
        res.status(401).send({ error: "Please provide a valid authentication token" })
    }
    try {
        const data = jwt.verify(token, SECRET_KEY)
        req.user = data.user
        next()
    } catch (error) {
       res.status(404).send({ error: error.message }); 
    }
}

module.exports = fetchUserMware
