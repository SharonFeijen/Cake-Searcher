"use strict";

const cakeRecipes = require("./cake-recipes.json");

// Creating a function that returns an array of recipes that match the search parameters
const searchRecipes = (recipes, searchItem) => {
  // Joining strings
  let MatchedRecipes = [].concat(recipes);
  if ("ingredients" in searchItem) {
    MatchedRecipes = MatchedRecipes.filter((recipe) => {
      const ingredientsInRecipe = recipe.Ingredients.toString();
      return searchItem.ingredients.every((ingredient) =>
        ingredientsInRecipe.includes(ingredient.toLowerCase())
      );
    });
  }
  if ("authors" in searchItem) {
    MatchedRecipes = MatchedRecipes.filter((recipe) => {
      return searchItem.authors.some((author) => {
        if (Object.is(recipe.Author, null)) {
          return false;
        } else {
          const recipeAuthor = recipe.Author.toLowerCase();
          return recipeAuthor.includes(author.toLowerCase());
        }
      });
    });
  }
  if ("searchTerms" in searchItem) {
    MatchedRecipes = MatchedRecipes.filter((recipe) => {
      const searchTerms = searchItem.searchTerms.split(" ");
      return searchTerms.every((searchTerm) => {
        if (Object.is(recipe.Description, null)) {
          const recipeName = recipe.Name.toLowerCase();
          return recipe.Name.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          const recipeDescription = recipe.Description + " " + recipe.Name;
          return recipeDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
      });
    });
  }
  return MatchedRecipes;
};

// Creating a function that takes an array of recipes
const printRecipes = (foundRecipes) => {
  console.log(
    `Number of matched recipes that have been found: ${foundRecipes.length}.\n\n______________________________________________\n`
  );

  // A listed display of the recipe, author(s), description and ingredients
  foundRecipes.forEach((recipe) => {
    console.log(`Recipe: ${recipe.Name}\n`);
    console.log(`Author(s): ${recipe.Author}\n`);
    console.log(`Description: \n${recipe.Description}\n`);
    console.log(`Ingredients:`);
    recipe.Ingredients.forEach((ingredient) => console.log("- " + ingredient));
    console.log("\n______________________________________________\n");
  });
};

// If you're ready to test: uncomment the code below.
// printRecipes(searchRecipes(cakeRecipes, {})); // 162
// printRecipes(searchRecipes(cakeRecipes, { ingredients: ["carrot"] })); // 3
// printRecipes(searchRecipes(cakeRecipes, { authors: ["Good food"] })); // 32
// printRecipes(searchRecipes(cakeRecipes, { searchTerms: "christmas simple" })); // 5
// printRecipes(
//     searchRecipes(cakeRecipes, {
//         ingredients: ["nuts"],
//         searchTerms: "christmas simple",
//     })
// ); // 2

/* Parameters 
const searchParams = {
  ingredients: ["carrot", "butter"],
}; */

// Printing the recipes that match parameters "carrot" and "butter"
printRecipes(
  searchRecipes(cakeRecipes, {
    ingredients: ["carrot", "butter"],
  })
);
