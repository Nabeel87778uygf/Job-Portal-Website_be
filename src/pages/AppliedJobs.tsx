import { useEffect, useState } from "react";

const AppliedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");


    const fetchAppliedJobs = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                "http://localhost:4000/api/user/applied-jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();


            setJobs(Array.isArray(data?.jobs) ? data.jobs : []);

        } catch (error) {
            console.log("ERROR:", error);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppliedJobs();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <h1 className="text-2xl font-bold mb-5">
                My Applied Jobs
            </h1>

            {loading && <p>Loading applied jobs...</p>}

            {!loading && jobs.length === 0 && (
                <p className="text-gray-500">
                    No jobs applied yet
                </p>
            )}

            <div className="grid gap-4 md:grid-cols-2">

                {jobs?.map((job) => (
                    <div
                        key={job?._id}
                        className="bg-white border p-4 rounded shadow-sm"
                    >

                        <h2 className="font-bold text-lg">
                            {job?.title}
                        </h2>

                        <p className="text-gray-700">
                            {job?.company}
                        </p>

                        <p className="text-sm text-gray-500">
                            {job?.location}
                        </p>


                        <p className="text-sm mt-2">
                            Status:{" "}
                            <span className="text-yellow-600">
                                Pending
                            </span>
                        </p>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default AppliedJobs; 