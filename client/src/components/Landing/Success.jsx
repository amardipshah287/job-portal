import success1 from "../../assets/success1.png";
import success2 from "../../assets/success2.png";
import success3 from "../../assets/success3.png";

import SuccessCard from "./SuccessCard";

export function Success() {
  return (
    <div className="pb-10 pt-6 space-y-4">
      <h1 className=" text-3xl md:text-4xl text-center font-semibold text-primary">
        Success Stories
      </h1>
      <p className="text-center text-lg px-2 md:text-xl text-primary">
        Hear from professionals who found their dream jobs thorugh Job Portal.
      </p>
      <div className=" flex flex-col gap-2 lg:gap-10 px-6 lg:flex-row justify-between">
        {[
          {
            url: success1,
            name: "Ram Chettry",
            position: "Marketing Manager at Kumari bank",
            story:
              "Jobpotel made my job search incredibly easy. Their AI matching system connected me with the perfect opportunity, and the application process was seamless",
            rating: "⭐⭐⭐",
          },
          {
            url: success2,
            name: "Ritu Magar",
            position: "General Manager at Kumari bank",
            story:
              "The platform's interface is intuitive, and the job matching algorithm is incredibly accurate. I couldn't be happier with my new role!",
            rating: "⭐⭐⭐⭐⭐",
          },
          {
            url: success3,
            name: "Shushant Rimal",
            position: "Branch Manager at Kumari bank",
            story:
              "The personalized job recommendations were spot-on. I found my current role within weeks of signing up. Highly recommend JobOpter to any job seeker!",
            rating: "⭐⭐",
          },
        ].map((stories, index) => {
          return (
            <SuccessCard
              imgURL={stories.url}
              name={stories.name}
              position={stories.position}
              story={stories.story}
              rating={stories.rating}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
