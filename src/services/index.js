export default class MovieAPI {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_API_URL;
    this.token = import.meta.env.VITE_MOVIEAPI_TOKEN;
  }

  searchMovie = async (value, page) => {
    let parsedValue = value.replace(" ", "%20");
    let request = `${this.baseURL}search/movie?query=${parsedValue}`;
    if (page) {
      request += `&page=${page}`;
    }
    try {
      const res = await fetch(request, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: "application/json",
        },
      });
      return await res.json();
    } catch (err) {
      throw new Error(err);
    }
  };

  getRatedMovies = async (ids) => {
    try {
      let arrayOfPromises = ids.map((id) => {
        let request = `${this.baseURL}movie/${id}`;
        return fetch(request, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            accept: "application/json",
          },
        });
      });
      const resArr = await Promise.all(arrayOfPromises);
      const result = await Promise.all(resArr.map((res) => res.json()));
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  static searchGenres = (lang) => {
    const result = new Map();
    try {
      let request = `${
        import.meta.env.VITE_BASE_API_URL
      }genre/movie/list?language=${lang}`;
      const res = fetch(request, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_MOVIEAPI_TOKEN}`,
          accept: "application/json",
        },
      });
      const data = res.then((response) => response.json());
      return data.then(({ genres }) => {
        genres.forEach(({ id, name }) => {
          result.set(id, name);
        });
        return result;
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
