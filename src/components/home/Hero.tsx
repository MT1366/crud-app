import heroImage from "../../assets/images/hero-book-2.webp";

function Hero() {
  return (
    <section className="flex m-5 justify-center">
      <img src={heroImage} className="h-80 w-90 rounded-lg mt-2" />
    </section>
  );
}

export default Hero;
