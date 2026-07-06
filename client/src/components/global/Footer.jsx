import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className=" md:block bg-primary text-white px-5 md:px-0">
      <div className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:text-center lg:grid-cols-4">
          <div className="space-y-4 text-justify">
            <h2 className="text-white text-2xl font-bold">About Us</h2>
            <p className="text-base">
              A job portal is an online platform where job seekers and employers
              connect. It allows users to search for jobs, apply, and upload
              resumes. Employers can post job listings, review applications, and
              find suitable candidates. Job portals often offer career resources
              like advice, courses, and interview tips to enhance job
              seekers&apos; prospects.
            </p>
          </div>

          <div>
            <h3 className="text-white text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { data: "Home", link: "/" },
                { data: "About us", link: "/aboutus" },
                { data: "Jobs", link: "/jobs" },
                { data: "Contact us", link: "/contactus" },
              ].map((link) => (
                <li key={link}>
                  <Link to={link.link}>{link.data}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-2xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {["Find Jobs", "Post Jobs", "Find best candidate"].map(
                (service) => (
                  <li key={service}>
                    <a href="#" className=" ">
                      {service}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11963.142221240034!2d87.26418265611261!3d26.663351168448667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6c66e80fbfa9%3A0x38094d1a7c974283!2sItahari!5e1!3m2!1sen!2snp!4v1735967971074!5m2!1sen!2snp"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=" flex-1 w-full h-full"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">© 2025. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
