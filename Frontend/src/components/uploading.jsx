import React from "react";

export default function Uploading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <span style={styles.text}>Uploading...</span>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#ffffff",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: {
    letterSpacing: "0.5px",
  },
};
