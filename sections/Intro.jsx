"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const Intro = () => {
  const [isHome, setIsHome] = useState(false);

  const homeRef = useRef();
  const introRef = useRef();
  const profileRef = useRef();

  // Intersection observer animation on scroll
  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // Scroll Animation
    if (homeRef.current) {
      const homeObserver = new IntersectionObserver(
        ([homeEntry]) => {
          setIsHome(homeEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
        }
      );

      homeObserver.observe(homeRef.current);

      if (isHome) {
        profileRef.current.classList.add("slide-in");
        introRef.current.classList.add("slide-in");
      } else {
        profileRef.current.classList.remove("slide-in");
        introRef.current.classList.remove("slide-in");
      }
    }
  }, [homeRef, isHome]);

  return (
    <Fragment>
      <Head>
        <title>Angel Portafolio</title>
      </Head>
      <section id='home'>
        <div
          className='min-h-[100vh] overflow-x-hidden px-[20px] md:px-[200px] lg:px-[200px] pt-[80px] md:pt-0 md:flex items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm'
          ref={homeRef}
        >
          <div
            className='translate-x-[-500px] transition-all duration-700 opacity-0'
            ref={introRef}
          >
            <p className='py-2 text-2xl md:text-4xl font-semibold font-sans'>
              Hello There !
            </p>
            {/* Profile Name */}
            <p className='text-2xl md:text-4xl py-2 font-semibold font-sans'>
              I&apos;m a FrontEnd
              <span className='text-[#c72c6c] dark:text-[#07d0e5]'>
                {" "}
                developer <span className='text-white'>|</span>
              </span>
            </p>
            <div className='mt-5 md:mt-10 flex gap-3'>
              {/* Hire Me Button */}
              <Link
                className='text-xl font-semibold rounded border border-[#c72c6c] hover:text-white hover:bg-[#c72c6c] 0 px-2 py-1 dark:border-[#07d0e5] dark:hover:bg-[#07d0e5] dark:hover:text-white'
                href={"#getInTouch"}
              >
                Contactame
              </Link>
              {/* Download CV Button */}
              <Link
                className='text-xl font-semibold rounded border border-[#c72c6c] hover:text-white hover:bg-[#c72c6c] 0 px-2 py-1 dark:border-[#07d0e5] dark:hover:bg-[#07d0e5] dark:hover:text-white'
                href='https://drive.google.com/file/d/1F3Zj_WdARmby9qcDNbTs--n3xg3pQFg4/view?usp=drive_link'
                target='_blank'
              >
                Descargar CV
              </Link>
            </div>
          </div>

          {/* Image */}
          <div
            className={
              "translate-x-[500px] transition-all opacity-0 duration-700 w-[180px] h-[300px] md:w-[240px] md:h-[400px] bg-cover m-auto md:m-0 mt-[40px] md:mt-0 bg-no-repeat"
            }
            ref={profileRef}
            style={{ backgroundImage: "url(/images/male.png)" }}
          />
        </div>
      </section>
    </Fragment>
  );
};

export default Intro;
