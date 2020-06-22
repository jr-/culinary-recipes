import { Request, Response } from 'express';

import FetchRecipesService from '@modules/recipes/services/FetchRecipesService';

export default class RecipesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ingredients: string = request.query.i as string;

    const ingredientsFilter = ingredients.split(',');

    const fetchRecipesService = new FetchRecipesService();
    const recipesResponse = await fetchRecipesService.execute(ingredientsFilter);

    return response.json(recipesResponse);
  }
}
