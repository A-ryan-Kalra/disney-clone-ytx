import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ShowThumbnail({ results }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  //   console.log(results);
  const router = useRouter();
  return (
    <div
      className="flex group relative min-w-[250px] min-h-[170px] md:min-w-[330px]   md:min-h[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer   border-[3px] border-[#f9f9f9]  border-opacity-10 hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
      onClick={() => router.push(`/show/${results.id}`)}
    >
      <Image
        src={
          `${BASE_URL}${results.backdrop_path || results.poster_path}` ||
          `${BASE_URL}${results.poster_path}`
        }
        width={330}
        height={210}
        alt="background"
        style={{ objectFit: "cover" }}
        className="rounded-lg   "
      />
    </div>
  );
}
