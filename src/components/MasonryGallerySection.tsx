import MasonryGallery from "@/components/MasonryGallery";

const galleryImages = [
  "/gallery/IC9A9465_Original.jpg",
  "/gallery/IC9A9586_Original.jpg",
  "/gallery/IMG_0558.jpg",
  "/gallery/IMG_0559.jpg",
  "/gallery/IMG_0560.jpg",
  "/gallery/IMG_0561.jpg",
  "/gallery/IMG_0562.jpg",
  "/gallery/IMG_1117.jpg",
  "/gallery/IMG_1446.jpg",
  "/gallery/IMG_1460.jpg",
  "/gallery/IMG_2507.jpg",
  "/gallery/IMG_2528.jpg",
  "/gallery/IMG_2680.jpg",
  "/gallery/IMG_2958.jpg",
  "/gallery/IMG_3003.jpg",
  "/gallery/IMG_3300.jpg",
  "/gallery/IMG_3301.jpg",
  "/gallery/IMG_3317.jpg",
  "/gallery/IMG_3324.jpg",
  "/gallery/IMG_3325.jpg",
  "/gallery/IMG_3327.jpg",
  "/gallery/IMG_3329(1).jpg",
  "/gallery/IMG_3330.jpg",
  "/gallery/IMG_3331.jpg",
  "/gallery/IMG_3332.jpg",
  "/gallery/IMG_3335.jpg",
  "/gallery/IMG_3336.jpg",
  "/gallery/IMG_3337.jpg",
  "/gallery/IMG_3339.jpg",
  "/gallery/IMG_3344.jpg",
  "/gallery/IMG_3346.jpg",
  "/gallery/IMG_3353.jpg",
  "/gallery/IMG_3355.jpg",
  "/gallery/IMG_3516.jpg",
  "/gallery/IMG_3801.jpg",
  "/gallery/IMG_5491.jpg",
  "/gallery/IMG_5492.jpg",
  "/gallery/IMG_5856.jpg",
  "/gallery/IMG_8312.jpg",
  "/gallery/IMG_8928.jpg",
  "/gallery/IMG_9349.jpg",
  "/gallery/IMG_9822.jpg",
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg",
  "/gallery/15.jpg",
  "/gallery/16.jpg",
  "/gallery/_1.png",
  "/gallery/_4.png",
];

const MasonryGallerySection = () => {
  return (
    <div id={"gallery"}>
      <MasonryGallery
        images={galleryImages}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.95}
        blurToFocus
        colorShiftOnHover={false}
      />
    </div>
  );
};

export default MasonryGallerySection;
