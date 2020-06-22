import { container } from 'tsyringe';

import IRecipeListProvider from './providers/RecipeListProvider/models/IRecipeListProvider';
import RecipePuppyRecipeListProvider from './providers/RecipeListProvider/implementations/RecipePuppyRecipeListProvider';

import IGifProvider from './providers/GifProvider/models/IGifProvider';
import GiphyGifProvider from './providers/GifProvider/implementations/GiphyGifProvider';

container.registerSingleton<IRecipeListProvider>(
  'RecipeListProvider',
  RecipePuppyRecipeListProvider,
);

container.registerSingleton<IGifProvider>('GifProvider', GiphyGifProvider);
