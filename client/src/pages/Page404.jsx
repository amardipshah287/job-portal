import { Link } from "react-router-dom";

export function Page404() {
  return (
    <section className="flex flex-col gap-4 items-center my-52 text-primary">
      <h1 className=" text-5xl text-center font-extrabold">404</h1>
      <h1 className=" text-5xl text-center font-bold">NOT FOUND</h1>
      <p className=" text-center font-medium text-2xl">
        The page you visited is not available at the moment.
      </p>
      <Link
        to="/"
        className=" border-none bg-primary text-white py-3 px-4 rounded-md cursor-pointer mt-3 text-center  font-medium"
      >
        Back to home page
      </Link>
    </section>
  );
}
