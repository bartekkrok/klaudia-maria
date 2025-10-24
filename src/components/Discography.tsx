'use client';

import ScrollStack from "@/components/ScrollStack";

const Discography = () => {


    return (
        <section className="py-24 md:px-8 max-w-7xl mx-auto" id="gallery">
            <div className="text-center fade-in">
                <h2 className="text-5xl md:text-6xl font-bold mb-4">Discography</h2>
                <div className="h-1 w-24 bg-gradient-accent mx-auto"/>
            </div>

            <ScrollStack/>;
        </section>
    );
};

export default Discography;
