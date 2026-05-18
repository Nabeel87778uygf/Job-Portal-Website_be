import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Jobs = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const keyword = queryParams.get("keyword") || "";
    const jobLocation = queryParams.get("location") || "";
    const category = queryParams.get("category") || "";

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
    });

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                setLoading(true);

                let url = "http://localhost:4000/api/jobs/search?";

                if (keyword) url += `keyword=${keyword}&`;

                if (jobLocation)
                    url += `location=${jobLocation}&`;

                if (category)
                    url += `category=${category}`;

                const res = await axios.get(url);

                setJobs(res.data.jobs || []);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchJobs();

    }, [keyword, jobLocation, category]);

    const applyJob = async () => {

        try {

            const res = await fetch(
                `http://localhost:4000/api/jobs/${selectedJob?._id}/apply`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            alert("Applied Successfully 🎉");

            setSelectedJob(null);

            setForm({
                fullName: "",
                email: "",
            });

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-2xl font-bold mb-4">
                Job Results
            </h1>

            <p className="text-gray-600 mb-6">

                Showing results for:{" "}

                <span className="font-semibold">
                    {keyword || "All Jobs"}
                </span>

                {jobLocation && (
                    <>
                        {" "}in{" "}
                        <span className="font-semibold">
                            {jobLocation}
                        </span>
                    </>
                )}

                {category && (
                    <>
                        {" "} | Category:{" "}
                        <span className="font-semibold text-blue-600">
                            {category}
                        </span>
                    </>
                )}

            </p>

            {loading && (
                <p>Loading jobs...</p>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                {jobs.map((job) => (

                    <div
                        key={job._id}
                        className="bg-white border p-4 rounded shadow hover:shadow-lg transition"
                    >

                        <h2 className="font-bold">
                            {job.title}
                        </h2>

                        <p className="text-gray-600">
                            {job.company}
                        </p>

                        <p className="text-sm text-gray-500">
                            {job.location}
                        </p>

                        <p className="text-sm text-blue-500">
                            {job.category}
                        </p>

                        <button
                            onClick={() => {

                                if (!user) {
                                    alert("Please login first");
                                    return;
                                }

                                // EMPLOYER LOGIN
                                if (user?.role === "employer") {
                                    alert("Please login with a Job Seeker account to apply");
                                    return;
                                }

                                // JOB SEEKER LOGIN
                                setSelectedJob(job);
                            }}
                            className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Apply Job
                        </button>

                    </div>
                ))}

            </div>

            {!loading && jobs.length === 0 && (

                <div className="text-center mt-10">

                    <h2 className="text-xl font-semibold text-gray-700">
                        No jobs found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Try different keyword or category
                    </p>

                </div>
            )}

            {selectedJob && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-white p-6 rounded w-96">

                        <h2 className="font-bold mb-2">
                            Apply for {selectedJob.title}
                        </h2>

                        <input
                            className="w-full border p-2 mb-2"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fullName: e.target.value
                                })
                            }
                        />

                        <input
                            className="w-full border p-2 mb-3"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                        />

                        <button
                            onClick={applyJob}
                            className="w-full bg-green-600 text-white py-2 rounded"
                        >
                            Submit Application
                        </button>

                        <button
                            onClick={() => setSelectedJob(null)}
                            className="w-full mt-2 text-red-500"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Jobs;