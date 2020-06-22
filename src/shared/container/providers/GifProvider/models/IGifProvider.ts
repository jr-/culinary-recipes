export default interface IGifProvider {
  getGifByName(name: string): Promise<string | undefined>;
}
