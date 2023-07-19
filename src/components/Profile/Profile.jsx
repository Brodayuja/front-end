import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { fetchUserById } from "../api-handlers";
import MyReviews from "./MyReviews";
import { DoorBack } from "@mui/icons-material";

function Profile({
  books,
  myUserId,
  isLoggedIn,
  setIsLoggedIn,
  reviews}) {
  const [user, setUser] = useState(null);
  const cookieId = localStorage.getItem("userId");

  const adminUrl = "http://localhost:5000";

  useEffect(() => {
    const altFetchData = async () => {
      try {
        if (cookieId) {
          const data = await fetchUserById(cookieId);
          if (data) {
            setUser(data);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

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

    altFetchData();
    fetchData();
  }, [myUserId, cookieId]);

  return (
    <>
      <NavBar
        myUserId={myUserId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        reviews={reviews} />

      <div className="flex mx-28">
        {user && (
          <div className="text-center">
            <br />

            <div className="flex border-b justify-between">
              <p className="text-3xl">Username: {user.username}</p>
              <div className="flex items-end">
                {" "}
                {/* Apply flex-col to parent div */}
                <Link className="px-8" to="/profile-edit">
                  Edit
                </Link>
                {user.is_admin ? <Link to={adminUrl}>Admin</Link> : null}
              </div>
            </div>

            <div className="flex">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-44 h-44 rounded-full mb-4 mt-7 mr-8"
              />
              <div className="flex flex-col text-left pt-4">
                <p>
                  <span className="font-bold">Name:</span> {user.name}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-bold">Location:</span> {user.location}
                </p>
                <p className="font-bold">About me:</p>
                <p className="bg-columbiaBlue border text-left">
                  {user.aboutMe}
                </p>
              </div>
            </div>

            <br />

            {<MyReviews books={books} />}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
