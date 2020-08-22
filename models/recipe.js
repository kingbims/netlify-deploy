let mongoose = require('mongoose');

//Recipe Schema
let recipeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    chef:{
        type: String,
        required: true
    },
    ingredients:{
        type: String,
        required: true
    }
});

let Recipe = module.exports = mongoose.model('Recipe', recipeSchema);