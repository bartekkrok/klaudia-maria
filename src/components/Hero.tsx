const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden max-md:mb-12"
    >
      <img
        alt={"Klaudia-Maria zdjęcie główne"}
        src={"/gallery/hero_main.png"}
        draggable={false}
        className="absolute left-0 bottom-0 opacity-65 max-md:w-1/2 max-md:h-auto -z-50"
      />
      <div className="absolute bottom-0 h-2 w-screen bg-gradient-accent" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto fade-in">
        <h1 className="text-6xl max-md:text-5xl font-bold mb-6 tracking-tight  font-(family-name:--font-playfair)">
          Klaudia-Maria
        </h1>
        <div className="h-1 w-24 bg-gradient-accent mx-auto mb-8 max-md:mb-5" />
        <p className="text-xl md:text-xl tracking-wide">
          Wokalistka • Autorka piosenek • Marzycielka
        </p>
        <p className="mt-6 max-md:mt-3 text-lg md:text-xl max-w-2xl mx-auto font-body">
          Pisze i śpiewa o tym, co czuje - prawdziwie i z duszą.
        </p>
      </div>
    </section>
  );
};

export default Hero;
