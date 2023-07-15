import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
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
        <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
        <NavBar />
      </div>

      <div>
        {user && (
          <div>
            <div>
              <h2>username: {user.username}</h2>
              <Link to="/profile-edit">edit profile</Link>
            </div>
            <br />
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Location: {user.location}</p>
            </div>
            <br />
            <div>
              <p>About me: {user.aboutMe}</p>
            </div>

            <br />

            {<MyReviews books={books} />}

            <h2>My Books Shelf Render Here</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
