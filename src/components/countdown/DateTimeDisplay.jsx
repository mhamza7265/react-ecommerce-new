const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div
      className={` ${
        isDanger ? "countdown danger" : "countdown"
      } text-center p-0 mx-0`}
    >
      <p className="m-0" style={{ color: "#3BB77E", fontSize: "20px" }}>
        {value}
      </p>
      <span style={{ fontSize: "16px" }}>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
