import { Link } from "react-router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { contactInfo, footerLinks, socialLinks } from "../../data/footer";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const renderLink = (title, links) => {
    return (
      <div>
        <h3 className="mb-3 text-sm font-semibold tracking-wider text-white uppercase">
          {title}
        </h3>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li
              key={index}
              to={link.path}
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-indigo-400"
            >
              <Link>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* MAIN FOOTER CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-12">
          {/* BRAND SECTION */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 flex w-fit items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
                <MenuBookIcon
                  sx={{
                    fontSize: 23,
                    color: "white",
                  }}
                />
              </div>
              <span className="text-2xl font-bold tracking-wide text-white uppercase">
                Jing Library
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-gray-400">
              Your gateway to endless knowledge. Discover, reserve, and enjoy
              thousands of books from our extensive collection
            </p>

            {/* CONTACT INFO */}
            <div className="mt-3 space-y-3">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                      <Icon
                        sx={{
                          fontSize: 17,
                          color: "#818CF8",
                        }}
                      />
                    </div>

                    <span className="text-gray-400">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-4 lg:gap-x-10">
            {renderLink("Library", footerLinks.library)}
            {renderLink("Company", footerLinks.company)}
            {renderLink("Legal", footerLinks.legal)}
            {renderLink("Membership", footerLinks.membership)}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 mb-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Subscribe to Out Newsletter
              </h3>
              <p className="text-sm text-gray-400">
                Get updates about new arrivals and special offerings.
              </p>
            </div>

            <div className="flex w-full gap-3 md:w-auto">
              <input
                type="email"
                placeholder="Enter your email...."
                className="flex-1 rounded-lg border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-600 focus:outline-none md:w-64"
              />
              <button className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold whitespace-nowrap text-white transition-colors hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-center text-sm text-gray-500 md:text-left">
              © {currentYear} Jing Library. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </a>
                );
              })}
            </div>

            <p className="text-center text-sm text-gray-500">
              Made with <span className="text-red-500">🤍</span> by{" "}
              <span className="font-medium text-gray-400">Houn Lyhour</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
