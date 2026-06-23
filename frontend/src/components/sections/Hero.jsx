import bleachSupreme from "../../assets/images/bleachSupreme.jpg";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <img
        src={bleachSupreme}
        alt="hero image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 md:py-[700px] py-[160px] md:px-[52px] px-4">
        <h1 className="md:text-9xl text-4xl font-comfortaa font-bold text-white">
          Style your desire
        </h1>
      </div>
    </section>
  );
}
