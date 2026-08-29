import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

export const footerLinks = {
  library: [
    { name: "Browse Books", path: "/books" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Popular Books", path: "/popular" },
    { name: "Categories", path: "/categories" },
  ],
  membership: [
    { name: "Join Now", path: "/signup" },
    { name: "Plans & Pricing", path: "/pricing" },
    { name: "Member Benefits", path: "/benefits" },
    { name: "FAQs", path: "/faqs" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Accessibility", path: "/accessibility" },
  ],
};

export const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
];
export const contactInfo = [
  { icon: EmailIcon, text: "contact@lyhourlibrary.com" },
  { icon: PhoneIcon, text: "+85570984211" },
  { icon: LocationOnIcon, text: "12 Library St, Tuol Sangke, Phnom Penh" },
];
