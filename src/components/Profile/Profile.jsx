import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { fetchUserById } from "../api-handlers";
import MyReviews from "./MyReviews";

function Profile({ myUserId, books }) {
  const [user, setUser] = useState(null);
  const cookieId = localStorage.getItem("id");


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
    <div>
      <div className="flex justify-between">
        <NavBar />
      </div>

      <div>
        {user && (
          <div>
            <div>
              <Link to="/profile-edit">edit profile</Link>
            </div>
            <br />
            <div>
              <p>Name: {user.name}</p>
              <p>username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Location: {user.location}</p>
            </div>
            <br />
            <div>
              <p>About me: {user.aboutMe}</p>
            </div>

            <br />

            {<MyReviews books={books} />}

          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
