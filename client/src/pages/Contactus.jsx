export function Contactus() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-4 px-2 md:px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-4xl font-semibold text-primary text-center mb-6">
          Contact us
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-[#0d4c89] transition">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-primary text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p className="mt-2">📍 123 Job Portal Street, Kathmandu, Nepal</p>
              <p className="mt-2">📞 +977-9876543210</p>
              <p className="mt-2">✉️ support@jobportal.com</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11963.142221240034!2d87.26418265611261!3d26.663351168448667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6c66e80fbfa9%3A0x38094d1a7c974283!2sItahari!5e1!3m2!1sen!2snp!4v1735967971074!5m2!1sen!2snp"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=" flex-1 w-full h-64 rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
