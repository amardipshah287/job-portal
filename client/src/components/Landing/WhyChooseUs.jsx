import { Star, CheckCircle, Users } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="py-10 bg-primary text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Star className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-4">
              AI-Powered Recommendations
            </h3>
            <p>
              Get personalized job matches based on your skills and preferences
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Employees</h3>
            <p>Apply with confidence to jobs from pioneer companies</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Career Resources</h3>
            <p>Access skill-building tools and expert career advice</p>
          </div>
        </div>
      </div>
    </section>
  );
}
