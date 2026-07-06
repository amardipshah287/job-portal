import { useEffect, useState } from "react";
import axios from "axios";
import apis from "../common/api";
import {
  Hero,
  WhyChooseUs,
  Success,
  TrendingCategory,
  LandingJobSection,
} from "../components/index";

export function Home() {
  const [landingData, setLandingData] = useState(null);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const response = await axios.get(apis.fetchLandingData.url, {
          withCredentials: true,
        });
        if (response.data?.status === "Success") {
          setLandingData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch landing page data:", error);
      }
    };
    fetchLandingData();
  }, []);

  return (
    <>
      <Hero stats={landingData?.stats} />
      <LandingJobSection featuredJobs={landingData?.featuredJobs} />
      <WhyChooseUs />
      <TrendingCategory categoryCounts={landingData?.categories} />
      <Success />
    </>
  );
}
