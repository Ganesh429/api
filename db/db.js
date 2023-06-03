let mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://pactime:0EM1eJ2N8uXWCEts@cluster0.i5xrelh.mongodb.net/owleeloc?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', function() {
    console.log('database connected')
}).on('error', function(error) {
    console.log(error);
})

module.exports = mongoose
