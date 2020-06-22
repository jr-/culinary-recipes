import axios from 'axios';
import AxiosHandler from '@shared/handlers/AxiosHandler';
import AppError from '@shared/errors/AppError';
import Recipe from '@modules/recipes/entities/Recipe';

import apiKeys from '@config/apiKeys';

interface RecipePuppyRecipe {
  title: string;
  href: string;
  ingredients: string;
  thumbnail: string;
}

interface RecipesResponse {
  keywords: string[];
  recipes: Recipe[];
}

const recipePuppyUrl = 'http://www.recipepuppy.com/api/';
const giphyUrl = 'https://api.giphy.com/v1/gifs/';

class FetchRecipesService {
  constructor(
  ) {}

  public async execute(ingredients: string[]): Promise<RecipesResponse> {
    let recipes: Recipe[] = [];
    try {
      const ingredientsString = ingredients.join(',');

      const recipesResponse = await axios.get(
        `${recipePuppyUrl}?i=${ingredientsString}`,
      );

      const recipesFetched: RecipePuppyRecipe[] = recipesResponse.data.results;

      recipes = recipesFetched.map(r => {
        const title = r.title.trim();

        const recipeIngredients = r.ingredients.split(', ');
        recipeIngredients.sort();

        return new Recipe(title, recipeIngredients, r.href);
      });
    } catch (err) {
      const axiosHandler = new AxiosHandler();
      axiosHandler.exception(err);
      throw new AppError('RecipePuppy API unavailable', 500);
    }

    try {
      const promises = recipes.map(async recipe => {
        const giphyResponse = await axios.get(
          `${giphyUrl}search?api_key=${apiKeys.giphyApiKey}&q=${recipe.title}&limit=1&offset=0&rating=G&lang=en`,
        );
  
        let gif;
        if (giphyResponse.data.data.length > 0) {
          gif = giphyResponse.data.data[0].url;
        }
        recipe.gif = gif;
      });

      await Promise.all(promises);
    } catch (err) {
      const axiosHandler = new AxiosHandler();
      axiosHandler.exception(err);
      throw new AppError('Giphy API unavailable');
    }

    return {
      keywords: ingredients,
      recipes,
    };
  }
}

export default FetchRecipesService;
