import { useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
    const user = useSelector((state: RootStates) => state.auth.user);
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