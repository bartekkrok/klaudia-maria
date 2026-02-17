import { headers } from "next/headers";
import Background from "@/components/Background";
import BandSection from "@/components/BandSection";
import Contact from "@/components/Contact";
import Discography from "@/components/Discography";
import Hero from "@/components/Hero";
import MasonryGallerySection from "@/components/MasonryGallerySection";
import Menu from "@/components/Menu";

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    );

  return (
    <div>
      <Menu />
      <main>
        <Hero />
        <BandSection />
        <Discography />

        <section>
          <div className="top-0 text-center fade-in pt-[80px] pb-[80px] max-md:pb-0 max-md:pt-0">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Galeria</h2>
            <div className="h-1 w-24 bg-gradient-accent mx-auto" />
          </div>
          <MasonryGallerySection />
        </section>
      </main>
      <Contact />
      <footer className="bg-white rounded-[16px] shadow-sm dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a
              href="https://www.linkedin.com/in/bartlomiej-krok/"
              className="hover:underline"
            >
              Bartłomiej Krok Development™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
      {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>*/}
      <Background />
    </div>
  );
}
