"use server";

import { NavBar } from "@components/navbar/NavBar";
import { AboutPageComponent } from "./About";

const AboutPage = async () => {
  return (
    <>
      <NavBar />
      <AboutPageComponent />
    </>
  );
};

export default AboutPage;
