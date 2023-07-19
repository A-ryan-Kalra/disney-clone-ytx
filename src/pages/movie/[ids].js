import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import Header from "../../../components/Header";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import Hero from "../../../components/Hero";
import Image from "next/image";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ReactPlayer from "react-player";

function Movie({ result }) {
  // console.log(result);
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [showPlayer, setShowPlayer] = useState(false);
  const index = result.videos.results.findIndex(
    (index) => index.type === "Trailer"
  );
  const { data: session } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (!session) {
      route.push("/");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>
          {result.title || result.original_title || result.original_name}
        </title>
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50 overflow-hidden">
          <div className="relative  min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              layout="fill"
              style={{ objectFit: "cover" }}
              className="mx-auto"
            />
          </div>

          <div
            className="absolute bottom-16 md:inset-y-auto bg-gray-600/40 rounded-lg h-max p-2 md:w-[1100px] md:bottom-10 inset-x-4
            md:inset-x-12 right-10 space-y-6 z-50 "
          >
            <h1 className="text-3xl text-white sm:text-4xl md:text-5xl font-bold">
              {result.title || result.original_title}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button className="text-sm text-black md:text-base flex items-center justify-center bg-[#f9f9f9] py-2 px-6 rounded hover:bg-[#c6c6c6]">
                <img
                  src="/images/play-icon-black.svg"
                  alt="play-icon"
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>
              <button
                className="text-sm text-black md:text-base flex items-center justify-center bg-gray-400/30 py-2 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-black.svg"
                  alt="play-icon"
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium text-gray-200  tracking-wide">
                  Trailer
                </span>
              </button>
              <div className="rounded-full border-2 flex items-center justify-center w-10 h-10 cursor-pointer bg-black/20 hover:bg-white/30">
                <PlusIcon className="h-6" />
              </div>
              <div className="rounded-full border-2 flex items-center justify-center w-10 h-10 cursor-pointer bg-black/20 hover:bg-white/30">
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>
            <p className="text-sm md:text-base">
              {result.release_date || result.first_air_date} •
              {Math.floor(result.runtime / 60)}h{" "}
              {Math.floor(result.runtime % 60)}m •{" "}
              {result.genres.map((genre) => genre.name + " ")}
            </p>
            <h4 className="text-sm md:text-lg font-medium max-w-4xl">
              {result.overview}
            </h4>
          </div>
          {showPlayer && (
            <div
              className="inset-0 absolute bg-black opacity-50 h-full
            w-full z-50"
              onClick={() => setShowPlayer(false)}
            />
          )}
          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%]
             rounded overflow-hidden transition duration-1000 ${
               showPlayer ? "opacity-100 z-50" : "opacity-0"
             }`}
          >
            <div className="flex items-center justify-between bg-black text-white p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="rounded-full cursor-pointer 
              w-8 h-8 justify-center items-center 
              flex p-1 opacity-50 hover:opacity-75 hover:bg-white/10"
                onClick={() => setShowPlayer(false)}
              >
                <XMarkIcon className="h-6" />
              </div>
            </div>
            <div className="relative text-white pt-[50.25%]">
              {result.videos ? (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: "0", left: "0" }}
                  controls={true}
                  playing={showPlayer}
                />
              ) : (
                alert("can't play Trailer")
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Movie;

export async function getServerSideProps(context) {
  const { ids } = context.query;
  const session = await getServerSession(context.req, context.res, authOptions);
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${ids}?api_key=${process.env.API_KEY}&append_to_response=videos`
  ).then((response) => response.json());
  return {
    props: {
      result: request,
      session,
    },
  };
}
