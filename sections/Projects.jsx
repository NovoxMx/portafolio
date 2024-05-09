"use client";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FaFigma } from "react-icons/fa";

import { ProjectsData } from "@/constants";

const Project = () => {
  const [height1, setHeight1] = useState("");
  const [isProjects, setIsProjects] = useState(false);
  const projectRef = useRef();
  const projectBoxesRef = useRef();

  useEffect(() => {
    if (projectRef.current) {
      const projectsObserver = new IntersectionObserver(
        ([projectsEntry]) => {
          setIsProjects(projectsEntry.isIntersecting);
        },
        {
          rootMargin: "-100px",
        }
      );

      projectsObserver.observe(projectRef.current);

      if (isProjects) {
        projectBoxesRef.current.classList.add("pop-up-child");
      } else {
        projectBoxesRef.current.classList.remove("pop-up-child");
      }
    }
  }, [isProjects, projectRef]);

  return (
    <Fragment>
      <section id='project' ref={projectRef}>
        <h2 className='text-3xl font-bold text-center pt-4 pb-8 flex justify-center items-center gap-3'>
          <CgWebsite /> Proyectos
        </h2>

        <div
          className='min-h-[400px] pop-down-child pb-[30px] flex flex-wrap px-[20px] gap-8 justify-around items-center shadow-sm shadow-zinc-300 dark:shadow-zinc-700'
          ref={projectBoxesRef}
        >
          {ProjectsData.map((project) => (
            <div
              className='transition-all duration-700 w-[330px]'
              key={project.projectName}
            >
              {/* Project Image */}
              <div
                className={
                  "w-[400px] shadow-md shadow-zinc-300 dark:shadow-zinc-700 h-60 bg-no-repeat flex flex-col justify-end rounded overflow-hidden bg-cover"
                }
                onMouseLeave={() => setHeight1("")}
                onMouseMove={() => setHeight1(project.projectName)}
                style={{
                  backgroundImage: `url(${
                    project?.projectImage?.imageUrl || ""
                  })`,
                }}
              >
                <div
                  className='bg-white p-1 cursor-pointer text-md stroke-2 text-black'
                  onMouseLeave={() => setHeight1("")}
                  onMouseMove={() => setHeight1(project.projectName)}
                >
                  {/* Project Name */}
                  <p
                    className='text-black text-center'
                    onClick={() =>
                      setHeight1(height1 === "" ? project.projectName : "")
                    }
                  >
                    {project.projectName}
                  </p>
                  <div
                    className='overflow-hidden transition-all duration-700 h-[75px] flex gap-10 justify-center items-center'
                    style={
                      height1 === project.projectName
                        ? { maxHeight: "200px" }
                        : { maxHeight: "0" }
                    }
                  >
                    {/* Figma url */}
                    {project.figmaUrl && (
                      <Link
                        className='text-xl text-white p-1 bg-gray-700 hover:bg-gray-950 rounded'
                        href={project.figmaUrl}
                        target='_blank'
                      >
                        <FaFigma />
                      </Link>
                    )}
                    {/* Github url */}
                    {project.githubUrl && (
                      <Link
                        className='text-xl text-white p-1 bg-gray-700 hover:bg-gray-950 rounded'
                        href={project.githubUrl}
                        target='_blank'
                      >
                        <BsGithub />
                      </Link>
                    )}
                  </div>
                  <div
                    className='overflow-hidden transition-all duration-700 h-[75px] flex gap-10 justify-center items-center'
                    style={
                      height1 === project.projectName
                        ? { maxHeight: "200px" }
                        : { maxHeight: "0" }
                    }
                  >
                    {/* Project Desc */}
                    {project.projectDescription && (
                      <p className='text-sm text-black'>
                        {project.projectDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Tech Stack */}
              <div className='flex flex-wrap gap-2 mt-4'>
                {project.techs.map((tech) => (
                  <p
                    className='px-1 text-sm rounded bg-blue-500 text-white'
                    key={tech}
                  >
                    {tech}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Project;
