import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import { fetchUserById } from "../api-handlers";

function Profile({ username, myUserId }) {
  const [user, setUser] = useState(null);
  // const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(myUserId){

          const data = await fetchUserById(myUserId);
          
          if(data){
            setUser(data)
          }else{
            setUser(null)
          }
          console.log(data);
          return data;
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [myUserId]);


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
