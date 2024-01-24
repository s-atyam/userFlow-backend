const app = require('../app')
const route = require('../src/routes/userprofile')

app.use('/api',route)

module.exports = app;