import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import { fetchUserById, updateUser } from "../api-handlers";

function EditProfile({ myUserId }) {
  const [user, setUser] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (myUserId) {
          const data = await fetchUserById(myUserId);
          if (data) {
            setUser(data);
          } else {
            setUser(null);
          }
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [myUserId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, username, password, confirmPassword, email, avatar, location, website, aboutMe } = user;
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      setPasswordError(null);

      await updateUser(myUserId, { name, username, password, email, avatar, location, website, aboutMe });

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <NavBar />
      </div>

      <div className="mt-8">
        {user && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="text-left block mb-2 font-semibold">Username:</label>
                <input
                  type="text"
                  value={user?.username || ""}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="text-left block mb-2 font-semibold">Name:</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="text-left block mb-2 font-semibold">Email:</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              {/* <div className="mb-4">
                <label className="text-left block mb-2 font-semibold">Password:</label>
                <input
                  type="password"
                  value={user?.password || ""}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="text-left block mb-2 font-semibold">Confirm Password:</label>
                <input
                  type="password"
                  value={user?.confirmPassword || ""}
                  onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>} */}
              <div className="mb-4">
                <label className="text-left block mb-2 font-semibold">Location:</label>
                <input
                  type="text"
                  value={user?.location || ""}
                  onChange={(e) => setUser({ ...user, location: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="text-left block mb-2 font-semibold">Website:</label>
                <input
                  type="text"
                  value={user?.website || ""}
                  onChange={(e) => setUser({ ...user, website: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">About me:</label>
                <textarea
                  value={user?.aboutMe || ""}
                  onChange={(e) => setUser({ ...user, aboutMe: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded ml-4"
                >Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded ml-4"
                >Save
                </button>
              </div>        
              
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
