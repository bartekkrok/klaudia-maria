import Hero from "@/components/Hero";
import Discography from "@/components/Discography";

export default function Home() {
    return (
        <div>
            <main>
                <Hero/>
                <Discography/>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
