
import React, { useEffect, useState } from 'react';
import axios from 'axios';




const People = () => {
    const [users, setUsers] = useState([]); // State for user list
    const [formOpen, setFormOpen] = useState(false); // State for toggling form
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        id_number: "",
        mobile: "",
        email: "",
        birth_date: "",
        language: "",
        interests: [],
    }); // State for form input

    const [editUserId, setEditUserId] = useState(null); // Track user being edited

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // If we're editing, we should update the user
        if (editUserId) {
            axios.put(`/api/update-people/${editUserId}`, formData)
                .then(response => {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.id === editUserId ? response.data : user
                        )
                    );
                    console.log('Updated user:', response.data);
                })
                .catch(error => {
                    console.error('There was an error updating the user:', error);
                });
        } else {
            // Otherwise, create a new user
            axios.post('/api/store-people', formData => formData)
                .then(response => {
                    setUsers(prevUsers => [...prevUsers, response.data]);
                    console.log('Created user:', response.data);
                })
                .catch(error => {
                    console.error('There was an error creating the user:', error);
                });
        }

        resetForm(); // Reset form after submission
    };


    const handleEdit = (user) => {
        setFormData(user);
        setEditUserId(user.id);
        setFormOpen(true);
    };

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    const handleCancel = () => {
        resetForm();
    };

    const resetForm = () => {
        setFormOpen(false);
        setEditUserId(null);
        setFormData({
            name: "",
            surname: "",
            id_number: "",
            mobile: "",
            email: "",
            birth_date: "",
            language: "",
            interests: [],
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-medium text-center">People Management</h2>
            <div className="overflow-x-auto p-10">
                <button
                    onClick={() => {
                        setFormOpen(true);
                        setEditUserId(null);
                    }}
                    className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                >
                    + Add People
                </button>

                {formOpen && (
                    <div className="flex items-center justify-center min-h-screen">
                        <form
                            onSubmit={handleFormSubmit}
                            className="p-4 w-full max-w-md bg-white border border-gray-300 rounded shadow"
                        >
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                required
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                placeholder="Surname"
                                required
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="text"
                                name="id_number"
                                value={formData.id_number}
                                onChange={handleInputChange}
                                placeholder="South African ID Number"
                                required
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                placeholder="Mobile Number"
                                required
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email Address"
                                required
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleInputChange}
                                required
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="text"
                                name="language"
                                value={formData.language}
                                onChange={handleInputChange}
                                placeholder="Language"
                                required
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="text"
                                name="interests"
                                value={formData.interests.join(", ")}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: "interests",
                                            value: e.target.value.split(", "),
                                        },
                                    })
                                }
                                placeholder="Interests (comma separated)"
                                className="mb-2 w-full border border-gray-300 p-2 rounded"
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    {editUserId ? "Update Person" : "Create People"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>ID Number</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Birth Date</th>
                            <th>Language</th>
                            <th>Interests</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.id_number}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.email}</td>
                                    <td>{user.birth_date}</td>
                                    <td>{user.language}</td>
                                    <td>{user.interests.join(", ")}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="bg-indigo-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default People;
