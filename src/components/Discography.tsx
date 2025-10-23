'use client';

import ScrollStack from "@/components/ScrollStack";

const ToksycznyIframe = () => {
    return <iframe
        data-testid="embed-iframe"
        style={{borderRadius: "12px"}}
        src="https://open.spotify.com/embed/track/6yRyOXOi8aZyT1BQFIAses?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
    />
}

const GhostingIframe = () => {
    return <iframe data-testid="embed-iframe" style={{borderRadius: "12px"}}
                   src="https://open.spotify.com/embed/track/3P4u2xwspyWcwN6BUt1YAw?utm_source=generator"
                   width="100%" height="352" frameBorder="0" allowFullScreen=""
                   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                   loading="lazy"></iframe>
}
const ChceZapomniecIframe = () => {
    return <iframe data-testid="embed-iframe" style={{borderRadius: "12px"}}
                   src="https://open.spotify.com/embed/track/2pOe7Ambcy8TooJUazmBwC?utm_source=generator" width="100%"
                   height="352" frameBorder="0" allowFullScreen=""
                   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                   loading="lazy"></iframe>
}
const NoweRozdanieIframe = () => {
    return <iframe data-testid="embed-iframe" style={{borderRadius: "12px"}}
                   src="https://open.spotify.com/embed/track/1ZPYNtCNTDXj4tJzaXCQWS?utm_source=generator&theme=0"
                   width="100%" height="352" frameBorder="0" allowFullScreen=""
                   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                   loading="lazy"></iframe>
}
const Discography = () => {
    const myCards = [
        {
            id: 1,
            bg: "bg-red-500",
            iframe: ToksycznyIframe
        },
        {
            id: 2, bg: "bg-blue-500",
            iframe: GhostingIframe
        },
        {
            id: 3, bg: "bg-green-500",
            iframe: ChceZapomniecIframe
        },
        {
            id: 4, bg: "bg-yellow-500",
            iframe: NoweRozdanieIframe
        },
    ];

    return (
        <section className="py-24 md:px-8 max-w-7xl mx-auto" id="gallery">
            <div className="text-center fade-in">
                <h2 className="text-5xl md:text-6xl font-bold mb-4">Discography</h2>
                <div className="h-1 w-24 bg-gradient-accent mx-auto"/>
            </div>

            <ScrollStack cards={myCards}/>;
        </section>
    );
};

export default Discography;
