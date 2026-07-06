const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./src/model/user_model");
const Job = require("./src/model/job_model");
const bcrypt = require("bcryptjs");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding");

  // Find or create a company
  let company = await User.findOne({ role: "Company" });
  if (!company) {
    company = await User.create({
      userName: "Tech Corp",
      userEmail: "company@techcorp.com",
      userPassword: await bcrypt.hashSync("password123", 10),
      userContact: "9800000000",
      role: "Company",
      approved: true,
      companyDescription: "A leading technology provider.",
    });
    console.log("Created test company:", company.userName);
  }

  // Create another company for diversity
  let healthcareCompany = await User.findOne({ userEmail: "hospital@health.com" });
  if (!healthcareCompany) {
    healthcareCompany = await User.create({
      userName: "City Hospital",
      userEmail: "hospital@health.com",
      userPassword: await bcrypt.hashSync("password123", 10),
      userContact: "9811111111",
      role: "Company",
      approved: true,
      companyDescription: "Your healthcare provider.",
    });
    console.log("Created healthcare company:", healthcareCompany.userName);
  }

  // Define some jobs
  const jobsToSeed = [
    {
      title: "Senior Node.js Developer",
      company: company._id,
      description: "Looking for an expert Node.js developer to design and implement backend architectures.",
      skills: ["Node.js", "Express", "MongoDB", "JavaScript"],
      salaryRange: { min: 80000, max: 120000 },
      location: "Kathmandu",
      locationType: "remote",
      jobType: "full-time",
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      approved: true,
      premium: true,
    },
    {
      title: "React Frontend Engineer",
      company: company._id,
      description: "We are seeking a talented React developer to join our team.",
      skills: ["React", "HTML", "CSS", "TailwindCSS"],
      salaryRange: { min: 70000, max: 100000 },
      location: "Lalitpur",
      locationType: "on-site",
      jobType: "full-time",
      expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      approved: true,
      premium: false,
    },
    {
      title: "Pediatric Nurse Specialist",
      company: healthcareCompany._id,
      description: "Seeking a compassionate Pediatric Nurse to care for children and support their families.",
      skills: ["Nursing", "Pediatrics", "Patient Care", "Healthcare"],
      salaryRange: { min: 50000, max: 80000 },
      location: "Pokhara",
      locationType: "on-site",
      jobType: "full-time",
      expirationDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      approved: true,
      premium: false,
    },
    {
      title: "Financial Accountant",
      company: company._id,
      description: "Manage accounts, tax audits, and help with financial reporting.",
      skills: ["Finance", "Accounting", "Excel", "Auditing"],
      salaryRange: { min: 60000, max: 90000 },
      location: "Biratnagar",
      locationType: "on-site",
      jobType: "full-time",
      expirationDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      approved: true,
      premium: false,
    },
    {
      title: "Digital Marketing Executive",
      company: company._id,
      description: "Plan and execute digital marketing campaigns, handle SEO and brand promotions.",
      skills: ["SEO", "Google Analytics", "Content Writing", "Marketing"],
      salaryRange: { min: 45000, max: 70000 },
      location: "Kathmandu",
      locationType: "remote",
      jobType: "part-time",
      expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      approved: true,
      premium: true,
    }
  ];

  for (const jobData of jobsToSeed) {
    const jobExists = await Job.findOne({ title: jobData.title });
    if (!jobExists) {
      await Job.create(jobData);
      console.log("Seeded job:", jobData.title);
    }
  }

  console.log("Seeding finished successfully!");
  await mongoose.disconnect();
};

seed().catch(console.error);
