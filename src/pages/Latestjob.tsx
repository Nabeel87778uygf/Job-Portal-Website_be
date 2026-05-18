import { useEffect, useState } from "react";
import axios from "axios";

const LatestJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLatestJobs = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:4000/api/jobs/latest"
            );

            setJobs(res.data.jobs || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLatestJobs();
    }, []);

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">
                Latest Jobs
            </h2>

            {loading && <p>Loading...</p>}

            {!loading && jobs.length === 0 && (
                <p>No jobs found</p>
            )}

            <div className="grid gap-4">

                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="border p-4 rounded bg-white"
                    >
                        <h3 className="font-bold">{job.title}</h3>
                        <p>{job.company}</p>
                        <p className="text-sm text-gray-500">
                            {job.location}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default LatestJobs;