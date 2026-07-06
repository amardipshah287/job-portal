import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../common/api";
import { useSelector } from "react-redux";
import { Upload } from "lucide-react";

export function CompanyProfilePage() {
  const { user } = useSelector((state) => state?.auth);
  console.log(user);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userContact: "",
    userPassword: "",
    companyLogo: "",
    companyDescription: "",
  });

  const userId = user?._id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFormData({
          userName: user.userName,
          userEmail: user.userEmail,
          userContact: user.userContact,
          userSkills: user.userSkills,
          companyDescription: user.companyDescription,
          companyLogo: user.companyLogo,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "userSkills" ? value : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, userResume: e.target.files[0] }));
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Object.keys(formData).forEach((key) => {
        if (!formData[key] || formData[key] === user[key]) {
          delete formData[key];
        }
      });

      if (formData.userSkills) {
        formData.userSkills = formData.userSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "");
      }

      if (!formData.userResume) {
        delete formData.userResume;
      }

      console.log(formData);

      const response = await axios.patch(
        `${apis.updateUser.url}/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">
        Company Profile Management
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Update Company Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="userEmail"
              className="block font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="userContact"
              className="block  font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="userContact"
              value={formData.userContact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="userPassword"
              className="block  font-medium text-gray-700"
            >
              password
            </label>
            <input
              type="password"
              id="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="companyDescription"
              className="block  font-medium text-gray-700"
            >
              Company description
            </label>
            <textarea
              id="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="companyLogo"
              className="block text-sm font-medium text-gray-700"
            >
              Company Logo
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="companyLogo"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="companyLogo"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus: outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Upload className="h-5 w-5 mr-2 text-primary" />
                Upload
              </label>
              {formData.companyLogo && (
                <span className="ml-2 text-sm">{formData.companyLogo}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
