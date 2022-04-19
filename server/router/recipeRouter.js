const { getAllRecipes, createRecipe, getById, updateById, deleteById } = require('../controllers/recipeController');

const { isUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/recipes', async (req, res) => { //TODO ADD iSUser middleware

    const result = await getAllRecipes();

    // console.log(result)
    res.status(200).json({ result });
});

router.post('/recipes', isUser, async (req, res) => { //TODO Add isUser middleware
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
        proteinServing: req.body.proteinServing
    };

    console.log(req.headers)


    const result = await createRecipe(data);
    res.status(201).json({result, message: 'Recipe created successfully'});

});

router.get('/recipes/:id', async (req, res) => {
    try {



        const id = req.params.id;
        console.log(id)

        const result = await getById(id);
        console.log(result)
        res.status(200).json({result});
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