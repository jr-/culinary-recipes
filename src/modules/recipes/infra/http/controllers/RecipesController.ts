import { Request, Response } from 'express';

import { container } from 'tsyringe';
import FetchRecipesService from '../../../services/FetchRecipesService';

export default class RecipesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ingredients: string = request.query.i as string;

    const ingredientsFilter = ingredients.split(',');

    const fetchRecipesService = container.resolve(FetchRecipesService);

    const recipesResponse = await fetchRecipesService.execute(
      ingredientsFilter,
    );

    return response.json(recipesResponse);
  }
}
