import IGifProvider from '../models/IGifProvider';

class FakeGifProvider implements IGifProvider {
  public async getGifByName(name: string): Promise<string | undefined> {
    return name;
  }
}

export default FakeGifProvider;
