import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  // api를 받아오는 로딩
  const [loading, setLoading] = useState(true);

  // api에서 받은 영화 리스트를 담음
  const [movies, setMovies] = useState([]);

  // async-await를 사용하기
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      )
    ).json();

    setMovies(json.data.movies);
    setLoading(false);
  };

  // api 한 번만 실행
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading ... </h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
