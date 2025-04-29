function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            HealthCare Compass
          </h2>
          <p className="mb-4">
            Empowering Smart Choices for Better Healthcare.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a
                href="/search-hospitals"
                className="hover:text-white transition duration-200"
              >
                Find Hospitals
              </a>
            </li>
            <li>
              <a
                href="/top-hospitals"
                className="hover:text-white transition duration-200"
              >
                Top Hospitals
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-white transition duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-white transition duration-200">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              Instagram
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>Saint Louis, MO 63108</p>
          <p>Email: support@healthcarecompass.com</p>
          <p>Phone: +1 (312) 456-7890</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pt-8 border-t border-gray-700 mt-10">
        © 2025 HealthCare Compass. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
