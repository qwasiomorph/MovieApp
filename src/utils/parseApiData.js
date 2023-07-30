export default function parseList(list) {
  return list.map(
    ({
      id,
      title,
      overview,
      poster_path,
      release_date,
      vote_average,
      genre_ids,
      original_language,
      genres,
    }) => {
      return {
        id,
        name: title,
        desc: overview,
        img: poster_path,
        releaseDate: new Date(release_date),
        score: vote_average,
        genres: genres ? genres.map((gnr) => gnr.id) : genre_ids,
        lang: original_language,
      };
    }
  );
}
