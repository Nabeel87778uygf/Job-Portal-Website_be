import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";

const CityFilter = ({ location, setLocation }) => {
    const [cities, setCities] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCities = async () => {
            const res = await axios.get(
                "http://localhost:4000/api/jobs/cities"
            );

            setCities(res.data.cities || []);
        };

        fetchCities();
    }, []);

    const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full">


            <div
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between bg-transparent cursor-pointer text-sm"
            >
                <span className="truncate">
                    {location || "City, state or remote"}
                </span>


                <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </div>


            {open && (
                <div className="absolute top-10 left-0 w-full bg-white shadow-lg rounded-md z-50">


                    <input
                        type="text"
                        placeholder="Search city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border-b outline-none"
                    />


                    <div className="max-h-40 overflow-y-auto">

                        {filteredCities.map((city, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setLocation(city);
                                    setOpen(false);
                                    setSearch("");
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {city}
                            </div>
                        ))}

                        {filteredCities.length === 0 && (
                            <div className="p-2 text-gray-500">
                                No cities found
                            </div>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
};

export default CityFilter;