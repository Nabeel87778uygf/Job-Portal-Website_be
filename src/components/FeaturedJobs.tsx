import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const companyColors = [
  "bg-accent/15 text-accent",
  "bg-cta/15 text-cta-foreground",
  "bg-primary/10 text-primary",
  "bg-destructive/10 text-destructive",
  "bg-accent/20 text-accent",
  "bg-cta/20 text-cta-foreground",
];

const FeaturedJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:4000/api/jobs/latest"
        );

        setJobs(res.data.jobs || []);

      } catch (error) {
        console.log("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJobs();
  }, []);

  return (
    <section id="jobs" className="py-20 bg-background" onClick={() => navigate("/jobs")}>
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Featured Opportunities
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            Latest Job Openings
          </h2>

          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Curated positions from top companies looking for talented professionals like you.
          </p>
        </div>


        {loading && (
          <p className="text-center text-muted-foreground">
            Loading latest jobs...
          </p>
        )}


        {!loading && jobs.length === 0 && (
          <p className="text-center text-muted-foreground">
            No jobs available right now
          </p>
        )}


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job, i) => (
            <div
              key={job._id}
              className="group bg-card rounded-2xl border border-border p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] cursor-pointer relative"
            >


              {job.isFeatured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-cta/15 text-cta text-xs font-semibold px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                </div>
              )}


              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${companyColors[i % companyColors.length]
                    }`}
                >
                  {job.company?.charAt(0) || "C"}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company}
                  </p>
                </div>
              </div>


              <div className="space-y-2 mb-5 text-sm text-muted-foreground">

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-4">

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>

                </div>
              </div>


              <div className="flex flex-wrap gap-2">
                {job.skills?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

            </div>
          ))}

        </div>


        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl"
            onClick={() => navigate("/jobs")}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            View All Jobs
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedJobs;