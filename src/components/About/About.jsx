import React from "react";
import img1 from "../../assets/officelogoabout.png";
import img2 from "../../assets/officelogoabout1.png";

const About = () => {
  return (
    <section className="mx-32 py-12">
      <div className="bg-white shadow-sm rounded gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg">
          <h2
            className="mb-4 text-4xl text-gray-900 font-thin first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left"
          >
            Empowering Education, Guiding Success
          </h2>
          <p className="mb-4">
            At EduConnect, we are committed to revolutionizing education through innovative solutions. Our team of strategists, designers, and developers are dedicated to providing seamless tuition management services tailored to your needs.
          </p>
          <p>
            We strive to be your partner in success, offering intuitive platforms and support systems designed to enhance learning experiences and facilitate academic excellence.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src={img1}
            alt="office content 1"
          />
          <img
            className="mt-4 w-full rounded-lg lg:mt-10"
            src={img2}
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
