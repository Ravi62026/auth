// model
// db
// middleware or controller


const app = require('./app')
// require("./config/database").connect()

const {PORT} = process.env  // process.env.PORT
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})