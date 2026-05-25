const StatBar = ({ score, label = "Score" }) => {
  const barColor =
    score >= 80 ? "#4caf50" : score >= 60 ? "#ff9800" : "#f44336";

  return (
    <div className="stat-wrapper">
      <p>
        {label}: {score}%
      </p>

      <div className="stat-bar">
        <div
          className="stat-fill"
          style={{
            width: `${score}%`,
            backgroundColor: barColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;