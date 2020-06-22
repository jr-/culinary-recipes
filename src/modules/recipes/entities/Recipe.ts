class Recipes {
  title: string;

  ingredients: string[];

  link: string;

  gif: string | undefined;

  constructor(
    title: string,
    ingredients: string[],
    link: string,
    gif?: string,
  ) {
    this.title = title;
    this.ingredients = ingredients;
    this.link = link;
    this.gif = gif;
  }

  setGif(gifUrl: string | undefined): void {
    this.gif = gifUrl;
  }
}

export default Recipes;
