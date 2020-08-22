const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/nodeproject', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

//Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//Check for db errors
db.on('errors', (err) => {
    console.log(err);
});

//Init app
const app = express();

//Bring in models
let Recipe = require('./models/recipe');

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Home route
app.get('/', (req, res) => {
   Recipe.find({}, (err, recipes) => {
    if(err) {
        console.log(err);
    } else {
        res.render('index', {
            title: 'Recipes',
            recipes: recipes
        });
    }
 });
});

//Get single recipe
app.get('/recipe/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render('recipe', {
            recipe:recipe
        });
    });
});

//Add route
app.get('/recipes/add', (req, res) => {
    res.render('add', {
        title: 'Add Recipe'
    });
});

//Add submit POST route
app.post('/recipes/add', (req, res) => {
    let recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.chef = req.body.chef;
    recipe.ingredients = req.body.ingredients;
    
    recipe.save((err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

//Load update form
app.get('/recipe/update/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render('update', {
            title:'Update Recipe',
            recipe:recipe
        });
    });
});

//Update submit POST route
app.post('/recipes/update/:id', (req, res) => {
    let recipe = {};
    recipe.name = req.body.name;
    recipe.chef = req.body.chef;
    recipe.ingredients = req.body.ingredients;
    
    let query = {_id:req.params.id}

    Recipe.update(query, recipe, (err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

//Delete Recipe
app.delete('/recipe/:id', (req, res) => {
    let query = {_id:req.params.id}

    Recipe.remove(query, (err) => {
        if(err) {
            console.log(err);
        }
        res.send('Success');
    });
});

//Start server
app.listen(3000, () => {
    console.log('Server running on port 3000...');
});