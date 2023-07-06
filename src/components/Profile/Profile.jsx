import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import pageTurnerLogo from "../images/pageTurnersLogo.png";
import { fetchUserById } from "../api-handlers";


function Profile({ myUserId }) {
  const [user, setUser] = useState(null);


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
        <div className="flex justify-between">
            <img className="Logo" src={pageTurnerLogo} alt="Page Turner Logo" />
            <NavBar/>
        </div>


     
      <div>
        {user && (
          <div>


            <div>
              <h2>username: {user.username}</h2>
              <Link to="/profile-edit">edit profile</Link>
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


            <h2>My Books Shelf Render Here</h2>


          </div>
         
        )}
      </div>
    </div>
  );
}


export default Profile;



