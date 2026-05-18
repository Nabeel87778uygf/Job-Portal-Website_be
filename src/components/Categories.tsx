import {
  Code,
  Palette,
  BarChart3,
  Megaphone,
  Stethoscope,
  GraduationCap,
  Building2,
  Wrench,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Technology", count: 3420, icon: Code },
  { name: "Design", count: 1850, icon: Palette },
  { name: "Finance", count: 2100, icon: BarChart3 },
  { name: "Marketing", count: 1640, icon: Megaphone },
  { name: "Healthcare", count: 980, icon: Stethoscope },
  { name: "Education", count: 750, icon: GraduationCap },
  { name: "Construction", count: 620, icon: Building2 },
  { name: "Engineering", count: 1320, icon: Wrench },
];

const Categories = () => {

  const navigate = useNavigate();

  const handleCategory = (category) => {
    navigate(`/jobs?category=${category}`);
  };

  return (
    <section id="categories" className="py-20 bg-secondary/50">

      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">

          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Explore
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            Browse by Category
          </h2>

          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Explore thousands of job opportunities across various industries and fields.
          </p>

        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {categories.map((cat) => (

            <div
              key={cat.name}
              onClick={() => handleCategory(cat.name)}
              className="group bg-card rounded-2xl border border-border p-6 text-center hover:border-accent/40 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >

              {/* Icon */}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">

                <cat.icon className="h-7 w-7 text-accent" />

              </div>

              {/* Name */}
              <h3 className="font-semibold text-foreground mb-1">
                {cat.name}
              </h3>

              {/* Count */}
              <p className="text-sm text-muted-foreground">
                {cat.count.toLocaleString()} jobs
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;