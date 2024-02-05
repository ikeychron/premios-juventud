import Navbar from '../molecules/Navbar';
// import { pageName } from "@/data";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full flex justify-center flex-col bg-hero bg-cover bg-center"
    >
      <div className="w-full h-full bg-black bg-opacity-40 text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="container px-4 mx-auto flex flex-col items-center flex-1 py-28">
          <div className="font-bold font-righteous">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
              Premios
            </h2>
            <h1 className="text-9xl leading-none">Juventud</h1>
          </div>

          <p className="mt-auto text-center max-w-[440px] font-medium">
            Los jovenes de la Misión Guanare 63 te invitan a disfrutar de este
            gran evento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
