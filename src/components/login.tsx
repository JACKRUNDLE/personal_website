import { useUserContext, googleSignIn, logOut} from "@/context/userContext";
import { useState } from "react";

import Button from '@mui/material/Button';

const Login = () => {
    const user = useUserContext();
    const [inputUser, setInputUser] = useState("");
    const [inputPassword, setInputPassword] = useState("");


    function handleLogout() {
        logOut();
    }
    function handleGoogleSignIn() {
        googleSignIn();
    }

    return (
        <div style={{borderStyle: "solid", padding: 20, margin: 5}}> 
            <div>
                {user ? (
                    <button onClick={handleLogout}> Log Out</button>
                ) : (
                    <div>
                        <p>
                            Welcome. Please Log In
                        </p>
                        {!user ? (
                        <Button variant="contained"onClick={handleGoogleSignIn}>Sign In</Button>
                        ) : (
                            <text> Welcome Jack</text>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Login;
