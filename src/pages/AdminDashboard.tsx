import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [dashboard, setDashboard] = useState(null);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const fetchJobs = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/admin/jobs", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setJobs(data.jobs || []);
        } catch (error) {
            console.log("Jobs Error:", error);
        }
    };


    const fetchDashboard = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setDashboard(data.data);
        } catch (error) {
            console.log("Dashboard Error:", error);
        }
    };


    const approveJob = async (id) => {
        try {
            await fetch(`http://localhost:4000/api/admin/job/${id}/approve`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchJobs();
        } catch (error) {
            console.log("Approve Error:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchDashboard();
    }, []);

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>


            {dashboard && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                    <div className="p-4 bg-gray-100 rounded">
                        <h2>Total Users</h2>
                        <p className="font-bold">{dashboard.totalUsers}</p>
                    </div>

                    <div className="p-4 bg-gray-100 rounded">
                        <h2>Total Jobs</h2>
                        <p className="font-bold">{dashboard.totalJobs}</p>
                    </div>

                    <div className="p-4 bg-gray-100 rounded">
                        <h2>Employers</h2>
                        <p className="font-bold">{dashboard.totalEmployers}</p>
                    </div>

                    <div className="p-4 bg-gray-100 rounded">
                        <h2>Job Seekers</h2>
                        <p className="font-bold">{dashboard.totalJobSeekers}</p>
                    </div>

                </div>
            )}


            <h2 className="text-xl font-semibold mb-3">Job Management</h2>

            {jobs.map((job) => (
                <div
                    key={job._id}
                    className="border p-3 mb-3 flex justify-between items-center"
                >

                    <div>
                        <h2 className="font-bold">{job.title}</h2>
                        <p>{job.company}</p>
                        <p>Status: {job.status}</p>
                    </div>

                    <div className="flex gap-2">


                        {job.status !== "approved" && (
                            <button
                                onClick={() => approveJob(job._id)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Approve
                            </button>
                        )}



                    </div>

                </div>
            ))}

        </div>
    );
};

export default AdminDashboard;