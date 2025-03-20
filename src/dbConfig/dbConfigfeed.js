

const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_DB)
        console.log("conncetd feed back db.....................")
    } catch (error) {
        console.log(error)
    }

}


export default connect;