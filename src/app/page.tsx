import Hero from "@/components/Hero";
import Discography from "@/components/Discography";
import Background from "@/components/Background";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div>
      <Menu />
      <main>
        <Hero />
        <Discography />
        <Gallery />
      </main>
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
