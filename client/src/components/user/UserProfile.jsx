import { useState, useEffect } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import apis from "../../common/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function UserProfile() {
  const { user } = useSelector((state) => state?.auth);
  console.log(user);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userContact: "",
    userPassword: "",
    userSkills: [],
    userResume: "",
  });

  const userId = user._id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFormData({
          userName: user.userName,
          userEmail: user.userEmail,
          userContact: user.userContact,
          userSkills: user.userSkills,
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
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-primary">
        Profile Management
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            className="block text-sm font-medium text-gray-700"
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
            className="block text-sm font-medium text-gray-700"
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
            className="block text-sm font-medium text-gray-700"
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
            htmlFor="userResume"
            className="block text-sm font-medium text-gray-700"
          >
            Resume/CV
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="userResume"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="userResume"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus: outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Upload className="h-5 w-5 mr-2 text-primary" />
              Upload
            </label>
            <span className="ml-2 text-sm">{formData?.userResume?.name}</span>
          </div>
        </div>
        <div>
          <label
            htmlFor="userSkills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="userSkills"
            value={formData.userSkills}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
            placeholder="e.g. JavaScript, React, Node.js"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary outline-none "
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
