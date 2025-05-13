import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const query = new URLSearchParams(useLocation().search);
  const company = query.get("company");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ company }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Unknown error");
        setReviews(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, [company]);

  return (
    <div>
      <h2>Top Reviews for {company}</h2>
      {error && <p>{error}</p>}
      {reviews.map((r, i) => (
        <div key={i}>
          <h3>{r.title}</h3>
          <p>{"★".repeat(r.rating)} ({r.rating}/5)</p>
          <p>{r.text}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Result;
