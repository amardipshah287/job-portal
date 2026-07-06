import axios from "axios";
import { useState } from "react";
import apis from "../../common/api";
import { toast } from "react-toastify";

export function JobPosting() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("on-site");
  const [jobType, setJobType] = useState("full-time");
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: jobTitle,
      description: jobDescription,
      skills: requiredSkills.split(",").map((skill) => skill.trim()),
      salaryRange: { min: Number(salaryMin), max: Number(salaryMax) },
      location,
      locationType,
      jobType,
      expirationDate,
    };

    console.log(jobData);
    try {
      const response = await axios.post(apis.createNewJob.url, jobData, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">
        Job Posting Management
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Create New Job Posting
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Job Title"
            id="jobTitle"
            value={jobTitle}
            onChange={setJobTitle}
          />
          <FormField
            label="Job Description"
            id="jobDescription"
            value={jobDescription}
            onChange={setJobDescription}
            isTextarea
          />
          <FormField
            label="Required Skills (comma-separated)"
            id="requiredSkills"
            value={requiredSkills}
            onChange={setRequiredSkills}
          />
          <div className="flex space-x-4">
            <FormField
              label="Salary Min"
              id="salaryMin"
              type="number"
              value={salaryMin}
              onChange={setSalaryMin}
            />
            <FormField
              label="Salary Max"
              id="salaryMax"
              type="number"
              value={salaryMax}
              onChange={setSalaryMax}
            />
          </div>
          <FormField
            label="Location"
            id="location"
            value={location}
            onChange={setLocation}
          />
          <SelectField
            label="Location Type"
            id="locationType"
            value={locationType}
            onChange={setLocationType}
            options={["on-site", "remote"]}
          />
          <SelectField
            label="Job Type"
            id="jobType"
            value={jobType}
            onChange={setJobType}
            options={["full-time", "part-time"]}
          />
          <FormField
            label="Expiration Date"
            id="expirationDate"
            value={expirationDate}
            onChange={setExpirationDate}
            type="date"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Job Posting
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  id,
  value,
  onChange,
  isTextarea = false,
  type = "text",
}) {
  const InputComponent = isTextarea ? "textarea" : "input";
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <InputComponent
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        required
      />
    </div>
  );
}

function SelectField({ label, id, value, onChange, options }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        required
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
