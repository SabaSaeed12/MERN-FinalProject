const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true,
    // useCreateIndex:true,
    useunifiedTopology:true,
    // useFindAndModify:false

}).then(() => {
    console.log('connection successfull');
}).catch((err) => console.log(`Error ${err}`));
