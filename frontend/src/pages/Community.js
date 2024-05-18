import React from 'react';

export default function Community() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={"http://localhost:3000"}
        width="1190px"
        height="100%"
        style={{ border: "none" }}
        title="Embedded Page"
      />
    </div>
  );
}
