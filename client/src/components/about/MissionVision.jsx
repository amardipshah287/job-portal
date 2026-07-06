import { Star, Brain } from "lucide-react";

export function MissionVision() {
  return (
    <section className="bg-white text-primary py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
          <div className="flex-1 max-w-md">
            <div className="flex items-center mb-4">
              <Star className="text-yellow-500 w-8 h-8 mr-4" />
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p>
              To empower individuals in their career journeys and help
              businesses find the perfect talent to drive their success.
            </p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="flex items-center mb-4">
              <Brain className="text-primary w-8 h-8 mr-4" />
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p>
              To create a world where every person can find fulfilling work and
              every company can build their dream team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
