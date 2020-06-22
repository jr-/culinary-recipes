import axios from 'axios';
import AppError from '@shared/errors/AppError';
import AxiosHandler from '@shared/handlers/AxiosHandler';
import Recipe from '@modules/recipes/entities/Recipe';
import IRecipeListProvider from '../models/IRecipeListProvider';

interface RecipePuppyRecipe {
  title: string;
  href: string;
  ingredients: string;
  thumbnail: string;
}

const recipePuppyUrl = 'http://www.recipepuppy.com/api/';

class RecipePuppyRecipeListProvider implements IRecipeListProvider {
  public async getRecipeListByIngredients(
    ingredients: string[],
  ): Promise<Recipe[]> {
    try {
      const ingredientsString = ingredients.join(',');

      const recipesResponse = await axios.get(
        `${recipePuppyUrl}?i=${ingredientsString}`,
      );

      const recipesFetched: RecipePuppyRecipe[] = recipesResponse.data.results;

      const recipes: Recipe[] = recipesFetched.map(r => {
        const title = r.title.trim();

        const recipeIngredients = r.ingredients.split(', ');
        recipeIngredients.sort();

        return new Recipe(title, recipeIngredients, r.href);
      });

      return recipes;
    } catch (err) {
      const axiosHandler = new AxiosHandler();
      axiosHandler.exception(err);
      throw new AppError('RecipePuppy API unavailable', 500);
    }
  }
}

export default RecipePuppyRecipeListProvider;
