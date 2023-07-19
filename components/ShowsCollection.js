import React from "react";
import { useRouter } from "next/router";
import ShowThumbnail from "./ShowThumbnail";

function ShowsCollection({ results, title }) {
  const router = useRouter();
  const id = router.query;
  // console.log(results);
  return (
    <div className=" relative flex flex-col space-y-2  my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>

      <div className="flex  -ml-2  space-x-6  overflow-y-hidden overflow-x-scroll scrollbar-hide p-2">
        {results.map((result) => (
          <ShowThumbnail key={result.id} results={result} />
        ))}
      </div>
    </div>
  );
}

export default ShowsCollection;
