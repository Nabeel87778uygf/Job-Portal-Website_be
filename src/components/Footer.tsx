import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary-foreground mb-4">
              <div className="rounded-lg bg-cta p-2">
                <Briefcase className="h-5 w-5 text-cta-foreground" />
              </div>
              <span className="text-xl font-bold">JobFlow</span>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Connecting talent with opportunity. Find your next career move with JobFlow.
            </p>
          </div>

          {[
            {
              title: "For Job Seekers",
              links: ["Browse Jobs", "Career Advice", "Salary Guide", "Resume Builder"],
            },
            {
              title: "For Employers",
              links: ["Post a Job", "Browse Candidates", "Pricing", "Enterprise"],
            },
            {
              title: "Company",
              links: ["About Us", "Blog", "Contact", "Privacy Policy"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-primary-foreground font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground/80 text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/40 text-sm">
            &copy; {new Date().getFullYear()} JobFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
