import Counter from "/components/Counter";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

export default function Banner({
  mintnft,
  totalminted,
  loading,
  incrementMint,
  decrementMint,
  mintAmount,
}) {
  // totalminted = 10000

  const [scrollDir, setScrollDir] = useState("scrolling down");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <div className="h-screen bg-green-900">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full flex justify-center items-center">
        <div className="">
          <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-pumpkin">
            <span className="inline-block text-white pr-4 font-pumpkin">Mint Your</span>
            <span className="inline-block text-white"> NFT</span>
          </h1>
          {totalminted !== 10000 ? (
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                <button
                  href="#"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-500 bg-white hover:bg-green-50 sm:px-8 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
                  onClick={mintnft}
                  disabled={loading}
                >
                  {loading === false ? "Mint NFT" : "Processing"}
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="text-center w-100 py-8">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                onClick={decrementMint}
              >
                <span className="sr-only">Reduce by One</span>
                <MinusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="inline-flex items-center px-6 py-2 rounded-1-md border border-gray-300 bg-white text-sm font-medium text-gray-500">
                {mintAmount}
              </div>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                onClick={incrementMint}
              >
                <span className="sr-only">Increase by One</span>
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </span>
          </div>
          <div className=" max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <Counter amount={totalminted} />
          </div>
        </div>
      </div>
    </div>
  );
}
