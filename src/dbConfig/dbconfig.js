// const mongoose = require('mongoose')

// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("connnecrted")
//     }
//     catch (err) {
//         console.log("cionetion failed")
//     }
// }


const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("conncetd")
    } catch (error) {
        console.log(error)
    }

}


export default connect;