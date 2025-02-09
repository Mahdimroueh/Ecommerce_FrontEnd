const Footer = () => {
  return (
    <footer className="bg-[#2d2d2d] text-white py-6 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div>
          <h3 className="text-lg font-semibold">Your Company</h3>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* Right Section */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
