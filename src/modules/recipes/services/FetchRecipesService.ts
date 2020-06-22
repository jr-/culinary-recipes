import { injectable, inject } from 'tsyringe';
import IRecipeListProvider from '@shared/container/providers/RecipeListProvider/models/IRecipeListProvider';
import IGifProvider from '@shared/container/providers/GifProvider/models/IGifProvider';
import Recipe from '../entities/Recipe';

interface RecipesResponse {
  keywords: string[];
  recipes: Recipe[];
}

@injectable()
class FetchRecipesService {
  constructor(
    @inject('RecipeListProvider')
    private recipeListProvider: IRecipeListProvider,

    @inject('GifProvider')
    private gifProvider: IGifProvider,
  ) {}

  public async execute(ingredients: string[]): Promise<RecipesResponse> {
    const recipes = await this.recipeListProvider.getRecipeListByIngredients(
      ingredients,
    );

    const promises = recipes.map(async recipe => {
      const gifUrl = await this.gifProvider.getGifByName(recipe.title);
      recipe.setGif(gifUrl);
    });

    await Promise.all(promises);

    return {
      keywords: ingredients,
      recipes,
    };
  }
}

export default FetchRecipesService;
