import { Request, Response } from 'express';

import axios from 'axios';
import AppError from '@shared/errors/AppError';
import Recipe from '@modules/recipes/entities/Recipe';

interface RecipePuppyRecipe {
  title: string;
  href: string;
  ingredients: string;
  thumbnail: string;
}

const recipePuppyUrl = 'http://www.recipepuppy.com/api/';
export default class RecipesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ingredients: string = request.query.i as string;

    const ingredientsFilter = ingredients.split(',');

    let recipes: Recipe[] = [];
    try {
      const ingredientsString = ingredientsFilter.join(',');

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
      throw new AppError('RecipePuppy API unavailable', 500);
    }

    return response.json(recipes);
  }
}
