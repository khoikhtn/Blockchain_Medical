const Footer = () => (
  <footer id="contact" className="bg-gray-800 text-white py-10 mt-52">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-bold">Contact Us</h4>
          <p className="mt-2">
            We’d love to hear from you! Reach out to us via any of the following methods:
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <h5 className="font-semibold">Email</h5>
            <p>blockchainhealthcare@gmail.com</p>
          </div>
          <div>
            <h5 className="font-semibold">Phone</h5>
            <p>+1 (123) 456-7890</p>
          </div>
          <div>
            <h5 className="font-semibold">Address</h5>
            <p>144 Xuan Thuy, Cau Giay, Hanoi, Vietnam</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>Follow us on:</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
            LinkedIn
          </a>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
