import React from "react";
import Signupform from "../../components/auth/Signupform";
function SignUpPage(props) {
  return (
    <div className="flex-container">
      <div className="gif">
        <img src="/assets/gif/Signup3.gif" alt="loading..." />
      </div>
      <div className="welcome">
        <h3>Welcome !</h3>
        <h3>Sign Up</h3>
        <p>Health Centre IIT Kanpur</p>
        <Signupform
          setSeverity={props.setSeverity}
          setShowSnachbar={props.setShowSnachbar}
          setSnachbarData={props.setSnachbarData}
        />
      </div>
    </div>
  );
}
export default SignUpPage;
