const express = require('express'); //express framework for building web applications and APIs
const bodyParser = require('body-parser'); //Middleware to parse incoming request body 
const cors = require('cors');//middleware which allows our server to accept requests from different origins
const multer = require('multer'); //middleware used to handle 'multipart/form-data' which is used for uploading files
const bcrypt = require('bcryptjs'); //library for password hashing 
const jwt = require('jsonwebtoken'); //library for creating and verifying JSON web tokens used for authentication
const { readFile, writeFile } = require('./file'); //readFile and writeFile functions are imported from './file.js

const app = express();
const port = process.env.PORT || 3000;

const secret_key = "aSZDxfcgvbvhjsadxfcgvsadxfcds";
const recipe = './Recipe.json';
const users = './Users.json';

// Middleware
app.use(express.json()); //converts the JSON data into javascript object
app.use(bodyParser.json());//converts the incoming reuqest bodies into JSON format
app.use(bodyParser.urlencoded({ extended: true })); //parse the URL-encoded data which is the deafult format for submission in HTML
app.use(cors()); //allows the frontend to make API calls to backend 
app.use('/uploads', express.static('uploads')); //serves the static files from the 'uploads' directory 

// Set up multer for file uploads
const storage = multer.diskStorage({ //initializes a storage engine
    destination: (req, file, cb) => { //determines the directory where the uploaded files will be stored
        cb(null, 'uploads/'); //cd is a callback function that must be call to indicate where to store file, null indicates that no error and second one specifies the destination of folder
    },
    filename: (req, file, cb) => { //determines the name of the uploaded file
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage }); //creating a multer instance that can be used in route handlers

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(400).json({ msg: "Token Required..." });
    } else {
        try {
            req.user = jwt.verify(token, secret_key);
            next();
        } catch (error) {
            res.status(400).json({ msg: "Invalid Token...." });
        }
    }
}

// Register User
app.post("/registerUser", (req, res) => {
    const users_data = readFile(users);
    let user_id;

    if (users_data.length === 0) {
        user_id = 1;
    } else {
        for (let i = 0; i < users_data.length; i++) {
            if (users_data[i].email === req.body.email) {
                res.status(400).json({ msg: "Email Already Exists..." });
                return;
            }
        }
        user_id = users_data[users_data.length - 1].id + 1;
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newUser = {
        id: user_id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

    users_data.push(newUser);
    writeFile(users, users_data);
    res.status(201).json({ msg: "User Registered..." });
});

// Login User
app.post("/login", (req, res) => {
    const users_data = readFile(users);
    for (let i = 0; i < users_data.length; i++) {
        if (users_data[i].email === req.body.email) {
            if (bcrypt.compareSync(req.body.password, users_data[i].password)) {
                const token = jwt.sign({ user_id: users_data[i].id }, secret_key);
                return res.status(200).json({ msg: "Login Successful...", token: token });
            } else {
                return res.status(400).json({ msg: "Incorrect Password..." });
            }
        }
    }
    res.status(400).json({ msg: "Incorrect Email..." });
});

// POST endpoint to add a recipe
app.post('/api/recipes', upload.single('image'), verifyToken, (req, res) => {
  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // Retrieve user information
  const users_data = readFile(users);
  const user = users_data.find(user => user.id === req.user.user_id);

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const recipe_data = readFile(recipe);
  let recipe_id;

  if (recipe_data.length === 0) {
    recipe_id = 1;
  } else {
    recipe_id = recipe_data[recipe_data.length - 1].id + 1;
  }

  const imagePath = req.file.path;
  const newRecipe = {
    id: recipe_id,
    user_id: user.id,            // Include user_id
    username: user.name,         // Include username
    recipeName: req.body.recipeName,
    dishType: req.body.dishType,
    prepTime: req.body.prepTime,
    shelfLife: req.body.shelfLife,
    difficulty: req.body.difficulty,
    image: imagePath,
    ingredients: req.body.ingredients,
    description: req.body.description,
    directions: req.body.directions,
  };

  recipe_data.push(newRecipe);
  writeFile(recipe, recipe_data);
  res.status(201).json(newRecipe);  // Return the new recipe with user_id and username included
});



//GET endpoint to retrieve recipes
app.get('/api/recipes', (req, res) => {
    const recipe_data = readFile(recipe);
    res.json(recipe_data);
});

// GET endpoint to retrieve a single recipe by ID
app.get('/api/recipes/:id', (req, res) => {
    const { id } = req.params;
    const recipe_data = readFile(recipe);
    const foundRecipe = recipe_data.find(recipe => recipe.id === parseInt(id, 10));

    if (foundRecipe) {
        res.json(foundRecipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

// Search route for recipe by name
app.get('/api/recipes/:recipeName', (req, res) => {
    const { recipeName } = req.params; // Use req.query to get the query parameter
    if (!recipeName) {
        return res.status(400).json({ error: 'Recipe name query parameter is required' });
    }

    const recipe_data = readFile(recipe); // Read from the correct file
    const foundRecipe = recipe_data.find(recipe => 
        recipe.recipeName.toLowerCase() === recipeName.toLowerCase() // Check for exact match
    );
    

    if (foundRecipe) {
        // Return only the title and description
        return res.json({
            recipeName: foundRecipe.recipeName,
            description: foundRecipe.description
        });
    } else {
        return res.status(404).json({ message: 'Recipe not found' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
