import { useEffect, useState } from "react";
import axios from "axios";
import apis from "../common/api";
import { Story, MissionVision, Stat, Team } from "../components/index";

export function Aboutus() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(apis.fetchLandingData.url, {
          withCredentials: true,
        });
        if (response.data?.status === "Success") {
          setStats(response.data.data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch about us stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connecting Talent with Opportunity
          </h1>
          <p className="text-xl mb-8">
            Empowering careers and businesses through innovative job matching
          </p>
        </div>
      </div>
      <Story />
      <MissionVision />
      <Stat stats={stats} />
      <Team />
    </div>
  );
}
