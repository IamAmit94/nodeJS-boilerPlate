const mongoose = require('mongoose')

const {DBNAME} = process.env
mongoose.connect(`mongodb://127.0.0.1:27017/${DBNAME}`, {
// useCreateIndex : true,
// useNewUrlParser: true,
useUnifiedTopology: true,
// useFindAndModify: false
})