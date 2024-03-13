import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate("/auth")
        }
    }, [user])

  return (
    <div>UserProfilePage</div>
  )
}

export default UserProfilePage