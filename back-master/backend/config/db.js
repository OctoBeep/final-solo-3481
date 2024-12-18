const mongoose =require('mongoose');

const conectarDB = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/tagliatore' ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }catch(error){
        console.log('error en el servicio:' + error.message)
    }
} 

module.exports = conectarDB