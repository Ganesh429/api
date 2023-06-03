let mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/searchdatabase', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', function() {
    console.log('database connected')
}).on('error', function(error) {
    console.log(error);
})

module.exports = mongoose