import Recipe from '@modules/recipes/entities/Recipe';

export default interface IRecipeListProvider {
  getRecipeListByIngredients(ingredients: string[]): Promise<Recipe[]>;
}
