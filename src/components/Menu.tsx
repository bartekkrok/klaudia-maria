"use client";

import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  { label: "Wstęp", ariaLabel: "Wstęp", link: "#hero" },
  { label: "Dyskografia", ariaLabel: "Learn about us", link: "#discography" },
  // { label: "Koncerty", ariaLabel: "Koncerty", link: "#concerts" },
  { label: "Galeria", ariaLabel: "View our services", link: "#gallery" },
  // { label: "Kontakt", ariaLabel: "Get in touch", link: "#contact" },
];

const socialItems = [
  {
    label: "Instagram",
    link: "https://www.instagram.com/klaudia.maria.official/",
  },
  { label: "YouTube", link: "https://www.youtube.com/@Klaudia-Maria_NK" },
  {
    label: "Spotify",
    link: "https://open.spotify.com/artist/2KYsFutx6XahOKU5FKvglS",
  },
  { label: "Tiktok", link: "https://www.tiktok.com/@klaudia_maria.official" },
  { label: "Facebook", link: "https://www.facebook.com/klaudia.maria.music/" },
];

const Menu = () => {
  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={menuItems}
      socialItems={socialItems}
      // displaySocials={true}
      displayItemNumbering={true}
      changeMenuColorOnOpen={true}
      colors={["#B19EEF", "#d742a5"]}
      // logoUrl="/path-to-your-logo.svg"
      accentColor="#d742a5"
      onMenuOpen={() => console.log("Menu opened")}
      onMenuClose={() => console.log("Menu closed")}
    />
  );
};

export default Menu;
