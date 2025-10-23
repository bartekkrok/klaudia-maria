const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url()`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15
                }}
            />
            <div className="absolute inset-0 bg-gradient-hero z-0"/>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto fade-in">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight  font-(family-name:--font-playfair)">
                    Klaudia-Maria
                </h1>
                <div className="h-1 w-24 bg-gradient-accent mx-auto mb-8"/>
                <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
                    Wokalistka • Autorka piosenek • Marzycielka
                </p>
                <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body font-light">
                    Pisze i śpiewa o tym, co czuje - prawdziwie i z duszą.
                </p>
            </div>
        </section>
    );
};

export default Hero;
