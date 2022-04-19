export interface Recipe {
    name: String, 
    dishType: String, 
    imageUrl: String, 
    servings: Number, 
    ingredients: String[], 
    preparation: String[], 
    caloriesRecipe: Number, 
    carbsecipe: Number, 
    fatRecipe: Number, 
    proteinRecipe: Number,
    caloriesServing: Number, 
    carbsServing: Number, 
    fatServing: Number, 
    proteinServing: Number,  
    likes: Number, 
    dislikes: Number, 
    peopleLiked: String[], 
    peopleDisliked: String[], 
    dateCreated: Date, 
    author: String
}