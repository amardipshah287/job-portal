function HeroSideCard({ numText, text }) {
  return (
    <div className=" bg-primary lg:bg-white text-white md:text-white lg:text-primary p-4 lg:py-2 lg:px-6 rounded-lg space-y-3">
      <h1 className=" text-2xl md:text-3xl lg:text-4xl font-semibold ">
        {numText}
      </h1>
      <p className="text-base md:text-lg lg:text-xl font-medium">{text}</p>
    </div>
  );
}

export default HeroSideCard;
