import Image from "next/image";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);

  return (
    <header
      className="sticky bg-[#040714] top-0 z-[1000] flex
  items-center px-10 h-[72px] md:px-12 "
    >
      <Image
        src="/images/logo.svg"
        width={80}
        height={80}
        className="cursor-pointer"
        alt="page-logo"
        onClick={() => router.push("/")}
      />
      {session && (
        <div className="hidden md:flex items-center space-x-6 ml-10 mr-10">
          <a className="header-link group ">
            <HomeIcon className=" h-4" />
            <span className="span">Home</span>
          </a>
          <a className="header-link group">
            <MagnifyingGlassIcon className="h-4" />
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            <PlusIcon className=" h-4" />
            <span className="span">WatchList</span>
          </a>
          <a className="header-link group">
            <StarIcon className=" h-4" />
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" className="h-4" alt="" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-4" />
            <span className="span">Series</span>
          </a>
        </div>
      )}

      {!session ? (
        <button
          className="uppercase ml-auto border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
          onClick={signIn}
        >
          Login
        </button>
      ) : (
        <img
          src={session.user.image}
          alt={session.user.name}
          className="ml-auto w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white "
          onClick={signOut}
        />
      )}
    </header>
  );
}

export default Header;
