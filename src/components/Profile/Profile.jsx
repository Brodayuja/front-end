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
        {user && (
          <div>

            <div>
              <h2>{user.username}</h2>
              <p>edit profile</p>
            </div>
              <br/>
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Location: {user.location}</p>
            </div>
              <br/>
            <div>
              <p>About me: {user.aboutMe}</p>
            </div>

              <br/>

            <h2>My Books/ My Fave</h2>

          </div>
          
        )}
      </div>
    </div>
  );
}

export default Profile;
