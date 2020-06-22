import axios from 'axios';
import AppError from '@shared/errors/AppError';
import AxiosHandler from '@shared/handlers/AxiosHandler';

import apiKeys from '@config/apiKeys';
import IGifProvider from '../models/IGifProvider';

const giphyUrl = 'https://api.giphy.com/v1/gifs/';

class GiphyGifProvider implements IGifProvider {
  public async getGifByName(name: string): Promise<string | undefined> {
    try {
      const giphyResponse = await axios.get(
        `${giphyUrl}search?api_key=${apiKeys.giphyApiKey}&q=${name}&limit=1&offset=0&rating=G&lang=en`,
      );

      let gif;
      if (giphyResponse.data.data.length > 0) {
        gif = giphyResponse.data.data[0].url;
      }

      return gif;
    } catch (err) {
      const axiosHandler = new AxiosHandler();
      axiosHandler.exception(err);
      throw new AppError('Giphy API unavailable');
    }
  }
}

export default GiphyGifProvider;
