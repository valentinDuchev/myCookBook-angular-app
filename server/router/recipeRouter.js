const { getAllRecipes, createRecipe, getById, updateById, deleteById } = require('../controllers/recipeController');
const { getUserByEmail, getUserById } = require('../controllers/userController');

const { isUser, parseJwt } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/recipes', async (req, res) => { //TODO ADD iSUser middleware

    const result = await getAllRecipes();

    // console.log(result)
    res.status(200).json({ result });
});

router.post('/recipes', isUser, async (req, res) => { //TODO Add isUser middleware
    try {
        const token = req.headers['authorization'];

        if (!token) {
            throw new Error('You have to log in to create recipe.')
        }

        const userData = parseJwt(token);
        console.log(userData.email);
        const user = await getUserByEmail(userData.email);
        console.log(user)


        const data = {
            name: req.body.name,
            dishType: req.body.dishType,
            imageUrl: req.body.imageUrl,
            ingredients: req.body.ingredients,
            preparation: req.body.preparation,
            servings: req.body.servings,
            caloriesRecipe: req.body.caloriesRecipe,
            carbsRecipe: req.body.carbsRecipe,
            fatRecipe: req.body.fatRecipe,
            proteinRecipe: req.body.proteinRecipe,
            caloriesServing: req.body.caloriesServing,
            carbsServing: req.body.carbsServing,
            fatServing: req.body.fatServing,
            proteinServing: req.body.proteinServing,
            author: user._id
        };

        // console.log(req.headers)


        const result = await createRecipe(data);
        res.status(201).json({ result, message: 'Recipe created successfully' });
    } catch (err) {
        res.json({ message: err.message })
        console.log(err)
    }

});

router.get('/recipes/:id', async (req, res) => {
    try {
        const token = req.headers['authorization'];

        if (token) {
            const userData = (parseJwt(token));
            console.log('UserData.email: ' + userData.email);
        }

        const id = req.params.id;
        const data = await getById(id);
        const userId = data.author;
        const user = await getUserById(userId);

        const result = {
            name: data.name,
            dishType: data.dishType,
            imageUrl: data.imageUrl,
            ingredients: data.ingredients,
            preparation: data.preparation,
            servings: data.servings,
            caloriesRecipe: data.caloriesRecipe,
            carbsRecipe: data.carbsRecipe,
            fatRecipe: data.fatRecipe,
            proteinRecipe: data.proteinRecipe,
            caloriesServing: data.caloriesServing,
            carbsServing: data.carbsServing,
            fatServing: data.fatServing,
            proteinServing: data.proteinServing,
            author: user.email
        }        

        res.status(200).json({ message: "Successfully opened details", result });

    } catch (err) {
        console.log(err)
    }
});

router.put('/recipes/:id', isUser, async (req, res) => {

    const id = req.params.id;

    const data = {
        name: req.body.name,
        dishType: req.body.dishType,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        calories: req.body.calories,
        carbs: req.body.carbs,
        fat: req.body.fat,
        protein: req.body.protein
    };

    const result = await updateById(id, data);
    res.status(201).json(result);
});

router.delete('/recipes/:id', isUser, async (req, res) => {
    const id = req.params.id;

    await deleteById(id);
    res.status(200).json({ message: "Deleted Successfully" })
})

module.exports = router;