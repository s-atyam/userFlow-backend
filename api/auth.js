const app = require('../app')
const route = require('../src/routes/userauth')

app.use('/api',route)

module.exports = app;