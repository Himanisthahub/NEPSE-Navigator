import React, { useEffect, useState } from "react";

const Settings = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5173/user-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserInfo(data.user);
        setEditedUserInfo(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editedUserInfo.oldPassword === editedUserInfo.newPassword) {
      try {
        const formData = new FormData();
        formData.append("fullname", editedUserInfo.fullname);
        formData.append("email", editedUserInfo.email);
        formData.append("phone", editedUserInfo.phone);
        formData.append("address", editedUserInfo.address);
        formData.append("oldPassword", editedUserInfo.oldPassword);
        formData.append("newPassword", editedUserInfo.newPassword);
        formData.append("userPhoto", editedUserInfo.userPhoto);

        const response = await fetch("http://localhost:4000/update-user-info", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setUserInfo(editedUserInfo);
          setIsEditing(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Incorrect Old Password");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setEditedUserInfo((prevState) => ({
      ...prevState,
      userPhoto: file,
    }));
    setIsPhotoChanged(true);

    const photoURL = URL.createObjectURL(file);
    setPhotoURL(photoURL);
  };

  return (
    <div className="mt-14 mx-8">
      <h1 className="text-4xl font-bold mb-6">Settings</h1>
      <div className="bg-white shadow-lg p-8 rounded-lg">
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* User Photo */}
            <div className="flex items-center">
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={
                  photoURL ||
                  (userInfo.photo
                    ? `http://localhost:5173/${userInfo.photo}`
                    : "https://via.placeholder.com/150")
                }
                alt="User"
              />
              {isPhotoChanged ? (
                <div className="ml-4">
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    className="block mt-2"
                  />
                  <button
                    type="button"
                    className="mt-2 text-sm text-red-500 underline"
                    onClick={() => setIsPhotoChanged(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPhotoChanged(true)}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Change Photo
                </button>
              )}
            </div>

            {/* Input Fields */}
            <div>
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="fullname"
                value={editedUserInfo.fullname}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={editedUserInfo.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone"
                value={editedUserInfo.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={editedUserInfo.address}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Old Password:</label>
              <input
                type="password"
                name="oldPassword"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">New Password:</label>
              <input
                type="password"
                name="newPassword"
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <img
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              src={
                userInfo.photo
                  ? `http://localhost:5173/${userInfo.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt="User"
            />
            <h2 className="text-xl font-semibold mb-2">{userInfo.fullname}</h2>
            <p className="text-gray-600">Email: {userInfo.email}</p>
            <p className="text-gray-600">Contact: {userInfo.phone}</p>
            <p className="text-gray-600">Address: {userInfo.address}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-md"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default profile;
