import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import pageTurnerLogo from "../images/pageTurnersLogo.png";

function Profile({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      <div>
        <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
      </div>

      <NavBar />
      <div>
        <h2>This is the Profile Page</h2>
        {user && (
          <div>
            <h3>User Details:</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
