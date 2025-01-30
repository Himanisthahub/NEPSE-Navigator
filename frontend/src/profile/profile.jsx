import React, { useState } from "react";

// Import assets
import PlusIcon from "../assets/addimage.png";
import TrashIcon from "../assets/delete.png";
import PencilIcon from "../assets/edit.png";
import UploadIcon from "../assets/uploadpic.png";

function Profile() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePicture = () => {
    setProfileImage(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-customBlue mb-8">Profile Picture</h1>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Profile Picture Section */}
        <div className="space-y-4">
          <div className="relative">
            <div className="w-[216px] h-[216px] rounded-full bg-gray-200 relative overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
              <button
                className="absolute bottom-2 right-2 w-8 h-8 bg-customBlue rounded-full flex items-center justify-center"
                onClick={() => document.getElementById("picture-upload")?.click()}
              >
                <img src={PlusIcon} alt="Add" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            className="w-full bg-customBlue hover:bg-customBlue-light text-white py-2 px-4 rounded"
            onClick={() => document.getElementById("picture-upload")?.click()}
          >
            <img src={UploadIcon} alt="Upload" className="inline-block w-4 h-4 mr-2" />
            Upload Picture
          </button>
          <input
            type="file"
            id="picture-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <button
            className="w-full border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-50"
            onClick={handleDeletePicture}
          >
            <img src={TrashIcon} alt="Delete" className="inline-block w-4 h-4 mr-2" />
            Delete Picture
          </button>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="first-name" className="text-customBlue font-medium">
                First Name
              </label>
              <div className="relative">
                <input
                  id="first-name"
                  placeholder="Himani"
                  className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-customBlue"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src={PencilIcon} alt="Edit" className="w-4 h-4 text-customBlue" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="last-name" className="text-customBlue font-medium">
                Last Name
              </label>
              <div className="relative">
                <input
                  id="last-name"
                  placeholder="Himani"
                  className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-customBlue"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src={PencilIcon} alt="Edit" className="w-4 h-4 text-customBlue" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-customBlue font-medium">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                placeholder="himanistha78@gmail.com"
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-customBlue"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img src={PencilIcon} alt="Edit" className="w-4 h-4 text-customBlue" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-customBlue font-medium">
              Password
            </label>
            <button className="w-full bg-customBlue hover:bg-customBlue-light text-white py-2 px-4 rounded">
              Change Password
            </button>
          </div>

          <div className="space-y-2">
            <label htmlFor="remove-account" className="text-customBlue font-medium">
              Remove Account
            </label>
            <button className="w-full border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-50">
              <img src={TrashIcon} alt="Delete" className="inline-block w-4 h-4 mr-2" />
              Remove Account
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button className="bg-customBlue hover:bg-customBlue-light text-white py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;
