import React from "react";

type ProgressBarProps = {
  percentComplete: number;
  isUploadComplete: boolean;
};
const ProgressBar = ({ percentComplete }: ProgressBarProps) => {
  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percentComplete}%`,
    backgroundColor: "#4ade80",
    borderRadius: "inherit",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${percentComplete}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
