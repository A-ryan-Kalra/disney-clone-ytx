import Head from "next/head";
import Image from "next/image";

function Hero() {
  return (
    <section className="">
      <Head>
        <title>Log in | Disney+</title>
      </Head>
      <div className="relative min-h-[calc(100vh-72px)]">
        <Image
          src={"/images/hero-background.jpg"}
          layout="fill"
          style={{ objectFit: "cover" }}
        />{" "}
      </div>
      <div className="flex justify-center items-center">
        <div
          className=" absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center
          max-w-screen-sm mx-auto p-8 -mt-16 "
        >
          <Image src="/images/cta-logo-one.svg" width={600} height={150} />
          <button className="bg-blue-600 uppercase text-xl font-extrabold rounded-full hover:bg-[#0485ee] py-4 px-6 w-full">
            Get all here
          </button>
          <p className="text-sm text-center">
            Get Premier Access to Disney+ exclusive content for an additional
            fee.
          </p>
          <Image
            src="/images/cta-logo-two.png"
            width={600}
            height={70}
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
