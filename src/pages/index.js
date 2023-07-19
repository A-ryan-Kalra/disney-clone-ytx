import Image from "next/image";
import Header from "../../components/Header";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Hero from "../../components/Hero";
import { useRouter } from "next/router";
import Slider from "../../components/Slider";
import Brands from "../../components/Brands";
import MoviesCollection from "../../components/MoviesCollection";
import ShowsCollection from "../../components/ShowsCollection";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home({
  popularMovies,
  popularShows,
  topRatedMovies,
  topRatedShows,
}) {
  const { data: sessions } = useSession();
  // console.log(sessions);
  return (
    <div>
      <Head>
        <title>Disney+</title>
      </Head>
      <Header />
      {!sessions ? (
        <Hero />
      ) : (
        <main className="relative min-h-screen  after:bg-home after:inset-0 after:absolute after:bg-cover after:bg-no-repeat after:bg-fixed after:z-[-1] ">
          <Slider />
          <Brands />
          <MoviesCollection results={popularMovies} title="Popular Movies" />
          <ShowsCollection results={popularShows} title="Trending" />
          <MoviesCollection results={topRatedMovies} title="Top Rated Movies" />
          <ShowsCollection results={topRatedShows} title="Top Rated Shows" />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const [
    popularMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatesShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    ),
    fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`
    ),
  ]);

  const [popularMovies, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      topRatedMoviesRes.json(),
      topRatesShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      topRatedMovies: topRatedMovies.results,
      topRatedShows: topRatedShows.results,
    },
  };
}
