import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchUser } from '../../services/userAPI'; 
import {updateUser } from '../../services/userAPI'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit form visibility
  const { register, handleSubmit, reset,formState: { errors }  } = useForm();
  const navigate = useNavigate()
  
//get user data

const getUserData = async () => {
  try {
    const userData = await fetchUser();
    setUser(userData);
    reset(userData); // Reset form with fetched user data
  } catch (error) {
    console.error(error);
    toast.error('Error in fetching data');
  }
};

  useEffect(() => {
    getUserData();
  }, [reset]);


  const onSubmit = async (data) => {
    try {
      const formData = new FormData(); // Create a FormData object to handle files
      formData.append('name', data.name);
      formData.append('mobile', data.mobile);
      formData.append('address', data.address);
      
      // Check if image file is uploaded
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]); // Append only the first file from FileList
      }
  
      const updatedUser = await updateUser(formData); // Send FormData to the API
      setUser(updatedUser.data);
      setIsEditing(false); // Hide the form after saving changes
      toast.success('Profile updated successfully!');
      location.reload();


      await getUserData()

    } catch (error) {
      console.error(error);
      toast.error('Error updating profile');
    }
  };
  
  
  return (
    <>
      {/* Section 1: Profile Display */}
      <div className="section1  p-10">
        <div className="max-w-md mb-10 mt-10 mx-auto bg-gray-300 p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-500"> {user?.name ? `${user?.name}'s` : 'Your'} Profile  </h2>

          <div className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-36 h-36 rounded-full border-4 border-gray-300 overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={user?.image || 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png'}
                  alt="Profile"
                />
              </div>
            </div>

            <div className="mt-10 mb-6 text-left space-y-2">
              <p className="text-gray-700 text-lg font-semibold">{user?.name}</p>
              <p className="text-gray-600 text-md">{user?.email}</p>
              <p className="text-gray-600 text-md">{user?.mobile}</p>
              <p className="text-gray-600 text-md">{user?.address}</p>
            </div>

            <button
              className="btn btn-primary bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => setIsEditing(true)} // Show the form when clicked
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Edit Profile Form */}
      {isEditing && (
        <div className="section2  py-10">
          <div className="max-w-lg mx-auto bg-gray-300 p-8 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Mobile</label>
                <input
                  type="text"
                  {...register('mobile')}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="mb-4">
  <label className="block mb-2 text-gray-600 font-medium">Address</label>
  <textarea
    {...register('address', {
      required: "Address is required",
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters long" // Set a minimum length for the address
      },
      maxLength: {
        value: 100,
        message: "Address cannot exceed 100 characters" // Set a maximum length
      },
      pattern: {
        value: /^[a-zA-Z0-9\s,'-]*$/,
        message: "Address can contain only letters, numbers, commas, apostrophes, hyphens, and spaces" // Regex for allowed characters
      }
    })}
    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
    placeholder="Enter your address"
    rows="2"
  />
  {/* Error message display */}
  {errors.address && (
    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
  )}
</div>



              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  className="file-input w-full max-w-xs"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                  onClick={() => setIsEditing(false)} // Cancel edit mode
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
