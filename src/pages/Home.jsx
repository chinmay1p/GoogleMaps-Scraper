import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company.trim()) return;
    navigate(`/result?company=${encodeURIComponent(company)}`);
  };

  return (
    <div>
      <h2>Enter Company Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. Amazon India"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Home;
