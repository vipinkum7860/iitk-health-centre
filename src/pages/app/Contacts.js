import React from "react";
import Paper from "@mui/material/Paper";
function Contacts() {
  return (
    <div className="contact">
      <Paper elevation={6}>
        <div className="contact-card">
          <h5>
            Contact Details: <span>Health Centre IIT Kanpur-208016</span>{" "}
          </h5>
          <h5>
            Medical Emergency Contact No: <span>+91 9876543210</span>{" "}
          </h5>
          <h5>
            Contact for IITK Ambulance: <span>+91 5432167890</span>
          </h5>
          <h5>
            Email: <span>healthcentre@iitk.ac.in</span>
          </h5>
          <h5>
            Contact Only For Technical Issues: <span>+91 0123456789</span>{" "}
          </h5>
        </div>
      </Paper>
    </div>
  );
}

export default Contacts;
