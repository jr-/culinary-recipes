import Recipe from '@modules/recipes/entities/Recipe';
import IRecipeListProvider from '../models/IRecipeListProvider';

class RecipePuppyRecipeListProvider implements IRecipeListProvider {
  public async getRecipeListByIngredients(
    ingredients: string[],
  ): Promise<Recipe[]> {
    const recipesListJson = [
      {
        title: '\n Hamburger Stew Recipe',
        ingredients: 'hamburger, potato, tomato',
        href: 'http://cookeatshare.com/recipes/hamburger-stew-54600',
      },
      {
        title: 'Cheesy Rotel Potatoes',
        ingredients: 'cheddar cheese, cream of mushroom soup, potato, tomato',
        href: 'http://www.recipezaar.com/Cheesy-Rotel-Potatoes-165866',
      },
    ];

    const recipesListFiltered = recipesListJson.filter(r =>
      ingredients.some(i => r.ingredients.search(i) !== -1),
    );

    const recipes: Recipe[] = recipesListFiltered.map(r => {
      const title = r.title.trim();

      const recipeIngredients = r.ingredients.split(', ');
      recipeIngredients.sort();

      return new Recipe(title, recipeIngredients, r.href);
    });

    return recipes;
  }
}

export default RecipePuppyRecipeListProvider;
