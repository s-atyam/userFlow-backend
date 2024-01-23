const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // get the user from jwt token and add id to req object
    const token = req.header('authToken');
    if (!token) {
        res.send({ error: 'Please authenticate using a valid token1' });
        return;
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.userID = data.ID;
        next();
    } catch (e) {
        console.log(e.message)
        res.send({ error: 'Please authenticate using a valid token2' });
    }
}

module.exports = fetchuser;