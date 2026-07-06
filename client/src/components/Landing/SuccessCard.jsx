export default function SuccessCard({ imgURL, name, position, story, rating }) {
  return (
    <div className=" flex flex-col flex-1 gap-2 bg-primary rounded-2xl px-4 py-6 text-white">
      <div className="flex gap-6">
        <img src={imgURL} alt={name} className="h-28" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">{name}</h1>
          <p className="text-lg">{position}</p>
        </div>
      </div>
      <p className="text-lg text-justify">{story}</p>
      <p className="text-xl">{rating}</p>
    </div>
  );
}
