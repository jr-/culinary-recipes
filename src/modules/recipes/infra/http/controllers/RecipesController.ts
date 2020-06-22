import { Request, Response } from 'express';


export default class RecipesController {
  public async index(request: Request, response: Response): Promise<Response> {

    return response.json({ok: true});
  }
}
