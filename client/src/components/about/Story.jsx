import { Briefcase, Users, Building } from "lucide-react";

export function Story() {
  return (
    <section className="py-10 text-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Our Story
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1 max-w-md ">
            <div className="flex items-center mb-4">
              <Briefcase className="text-primary w-8 h-8 mr-4" />
              <h3 className="text-xl font-semibold">2015: The Beginning</h3>
            </div>
            <p>
              Founded with a vision to revolutionize the job search process.
            </p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="flex items-center mb-4">
              <Users className="text-green-600 w-8 h-8 mr-4" />
              <h3 className="text-xl font-semibold">2018: Rapid Growth</h3>
            </div>
            <p>
              Expanded our user base to over 1 million job seekers and
              employers.
            </p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="flex items-center mb-4">
              <Building className="text-primary w-8 h-8 mr-4" />
              <h3 className="text-xl font-semibold">2023: Global Presence</h3>
            </div>
            <p>Now operating in 50+ countries, connecting talent worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
