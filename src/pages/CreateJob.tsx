import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        jobType: "full-time",
        salary: "",
        category: ""
    });

    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        try {

            if (!form.category) {
                alert("Category is required");
                return;
            }

            const res = await axios.post(
                "http://localhost:4000/api/jobs",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Job Created Successfully 🎉");

            navigate("/employer");

        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message || "Error creating job");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">

            <h2 className="text-2xl font-bold mb-4">Post a Job</h2>

            <input
                placeholder="Title"
                className="border p-2 w-full mb-2"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
                placeholder="Company"
                className="border p-2 w-full mb-2"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
            />

            <textarea
                placeholder="Description"
                className="border p-2 w-full mb-2"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
                placeholder="Location"
                className="border p-2 w-full mb-2"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            {/* ⭐ CATEGORY FIX (MOST IMPORTANT) */}
            <select
                className="border p-2 w-full mb-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Healthcare">Healthcare</option>
            </select>

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white w-full py-2 rounded"
            >
                Post Job
            </button>

        </div>
    );
};

export default CreateJob;