import React, { useState, useEffect } from "react";
import axios from "axios";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Provide Token");
                return;
            }
            try {
                const role = localStorage.getItem("role"); // Get the user's role from localStorage
                const response = await axios.get("http://localhost:5000/api/student/getEvents", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setError("Failed to fetch events. Please try again.");
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
                Upcoming Events
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h2>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="space-y-2">
                            <p className="text-gray-700">
                                <span className="font-semibold">Start Date:</span>{" "}
                                {new Date(event.startDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">End Date:</span>{" "}
                                {new Date(event.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        {/* <button
                            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                        >
                            Register
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventPage;