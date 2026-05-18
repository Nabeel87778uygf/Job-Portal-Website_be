import { useEffect, useState } from "react";

const EmployerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 CATEGORY ADDED
    const [form, setForm] = useState({
        title: "",
        company: "",
        description: "",
        category: ""   // ✅ IMPORTANT FIX
    });

    const token = localStorage.getItem("token");

    // ================= FETCH MY JOBS =================
    const fetchMyJobs = async () => {
        if (!token) return;

        try {
            setLoading(true);

            const res = await fetch("http://localhost:4000/api/jobs/my-jobs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
                return;
            }

            setJobs(Array.isArray(data.jobs) ? data.jobs : []);

        } catch (error) {
            console.log("FETCH ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyJobs();
    }, []);

    // ================= POST JOB =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔥 VALIDATION FIX
        if (!form.title || !form.company || !form.description || !form.category) {
            alert("All fields required");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            alert("Job Posted Successfully 🎉");

            // reset form
            setForm({
                title: "",
                company: "",
                description: "",
                category: ""
            });

            fetchMyJobs();

        } catch (error) {
            console.log("POST ERROR:", error);
        }
    };

    return (
        <div className="p-6 grid gap-6">

            {/* ================= POST JOB ================= */}
            <div className="border p-4 rounded bg-white">
                <h2 className="text-xl font-bold mb-3">Post Job</h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* TITLE */}
                    <input
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    {/* COMPANY */}
                    <input
                        placeholder="Company"
                        value={form.company}
                        onChange={(e) =>
                            setForm({ ...form, company: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    {/* DESCRIPTION */}
                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    {/* 🔥 CATEGORY DROPDOWN */}
                    <select
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                    </select>

                    {/* BUTTON */}
                    <button className="bg-black text-white w-full py-2 rounded">
                        Post Job
                    </button>

                </form>
            </div>

            {/* ================= MY JOBS ================= */}
            <div>
                <h2 className="text-xl font-bold mb-3">My Jobs</h2>

                {loading && <p>Loading...</p>}

                {!loading && jobs.length === 0 && (
                    <p>No jobs posted yet</p>
                )}

                <div className="grid gap-3">

                    {jobs.map((job) => (
                        <div key={job._id} className="border p-4 rounded bg-white">

                            <h3 className="font-bold">{job.title}</h3>
                            <p>{job.company}</p>

                            <p className="text-sm text-gray-500">
                                Status: {job.status}
                            </p>

                            <p className="text-sm text-blue-500">
                                Category: {job.category || "N/A"}
                            </p>

                            <p className="text-sm text-green-500">
                                Applicants: {job.applicants?.length || 0}
                            </p>

                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default EmployerDashboard;