import React, { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../services/studentservice";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = React.useState(0);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try{
      const students = await getStudents();
      setTotalStudents(students.length);
    }catch(error){
      console.error("Failed to load students", error);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
     <div style={styles.container}>
      <h1 style={styles.title}>🎓 Student Management Dashboard</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>Total Students</h2>
          <p style={styles.count}>{totalStudents}</p>
        </div>

        <div style={styles.card}>
          <h2>Manage Students</h2>
          <button
            style={styles.button}
            onClick={() => navigate("/students")}
          >
            Go to Students
          </button>
        </div>

        {/* <div style={styles.card}>
          <h2>System Info</h2>
          <p>Spring Boot + React + MySQL</p>
        </div> */}
      </div>

      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center" as const,
    minHeight: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "white",
  },
  title: {
    marginBottom: "40px",
    fontSize: "2.5rem",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap" as const,
  },
  card: {
    backgroundColor: "white",
    color: "#333",
    padding: "30px",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  },
  count: {
    fontSize: "3rem",
    fontWeight: "bold" as const,
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#2a5298",
    color: "white",
  },
  logout: {
    marginTop: "50px",
    padding: "10px 25px",
    backgroundColor: "#ff4b5c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  
};

export default Dashboard;