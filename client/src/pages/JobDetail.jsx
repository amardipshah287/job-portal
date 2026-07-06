import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../common/api";
import { useSelector } from "react-redux";
import { Crown } from "lucide-react";

export function JobDetail() {
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState("");

  const { user } = useSelector((state) => state.auth);
  const id = location?.state?.id;

  console.log(skillInput);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${apis.getSingleJob.url}/${id}`, {
          withCredentials: true,
        });
        setJob(response?.data?.data);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApplyNow = () => {
    setIsApplying(true);
  };

  const handleSubmitApplication = async () => {
    if (!user) {
      toast.warn("please login to apply for a job.");
      return;
    }

    if (!coverLetter.trim()) {
      toast.warn("Cover letter is required.");
      return;
    }

    if (!user.userResume) {
      toast.warn("No resume found, please update it in the profile section.");
      return;
    }

    const shortlisterData = {
      experience_years: parseFloat(experience),
    };

    skills.forEach((skill) => {
      shortlisterData[skill] = 1;
    });

    shortlisterData[job.title] = 1;

    try {
      const response = await axios.post(
        apis.applyJob.url,
        {
          jobId: id,
          userId: user._id,
          resume: user.userResume,
          coverLetter,
          shortlisterData,
        },
        { withCredentials: true }
      );
      console.log("clicked2");
      setIsApplying(false);
      toast.success(response.data?.message);
      setCoverLetter("");
      setSkills([]);
      setExperience("");
    } catch (error) {
      console.log("clicked3");
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!job) return <div className="text-center py-10">Job not found.</div>;

  return (
    <div className="container max-w-[1240px] mx-auto px-4 py-8">
      <img src={job.company?.companyLogo} alt="companyLogo" className="w-20" />
      <h1 className="text-3xl font-bold text-primary mb-4">
        {job.company?.userName}
      </h1>
      <p className="text-lg flex gap-2">
        Role: <span className="font-semibold">{job.title}</span>
        <span className="text-yellow-500">{job.premium && <Crown />}</span>
      </p>
      <p className="text-gray-500 mb-4">Company location: {job.location}</p>

      {job.salaryRange?.min && job.salaryRange?.max && (
        <p className="text-gray-800 font-medium">
          Salary: Rs.{job.salaryRange.min} - Rs.{job.salaryRange.max}
        </p>
      )}

      <div className="mt-4">
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
          {job.locationType}
        </span>
        &nbsp;and&nbsp;
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {job.jobType}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Job Description</h2>
        <p className="text-gray-600 w-[40%] mt-2">{job.description}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Required Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleApplyNow}
          className="bg-primary hover:bg-blue-600 text-white py-3 px-6 rounded-md"
        >
          Apply Now
        </button>
      </div>

      {isApplying && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white py-6 px-3 rounded-md w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              Submit Your Application
            </h2>
            <label className="block font-medium mb-1">Cover Letter</label>
            <textarea
              className="w-full border p-2 rounded-md"
              rows="4"
              placeholder="Write your cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
            <div className="">
              <label className="block font-medium mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium mb-1">Skills</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border p-2 rounded-md w-full"
                  placeholder="Hit Enter to for next skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && skillInput.trim()) {
                      e.preventDefault();
                      if (!skills.includes(skillInput.trim())) {
                        setSkills([...skills, skillInput.trim()]);
                      }
                      setSkillInput("");
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex mt-4 justify-center">
              <button
                onClick={() => setIsApplying(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
