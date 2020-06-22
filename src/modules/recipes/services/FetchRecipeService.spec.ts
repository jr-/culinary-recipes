import 'reflect-metadata';

import Recipe from '@modules/recipes/entities/Recipe';
import FakeGifProvider from '@shared/container/providers/GifProvider/fakes/FakeGifProvider';
import FakeRecipeListProvider from '@shared/container/providers/RecipeListProvider/fakes/FakeRecipeListProvider';
import FetchRecipesService from './FetchRecipesService';

interface RecipesResponse {
  keywords: string[];
  recipes: Recipe[];
}

describe('FetchRecipesService', () => {
  it('should be able to fetch a recipe list and create response json', async () => {
    const fakeRecipeListProvider = new FakeRecipeListProvider();
    const fakeGifProvider = new FakeGifProvider();

    const fetchRecipesService = new FetchRecipesService(
      fakeRecipeListProvider,
      fakeGifProvider,
    );

    const recipeResponse: RecipesResponse = await fetchRecipesService.execute([
      'tomato',
      'onion',
      'potato',
    ]);

    expect(recipeResponse).toHaveProperty('keywords');
    expect(recipeResponse).toHaveProperty('recipes');
  });
});
