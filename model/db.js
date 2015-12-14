var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI, function(error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});
