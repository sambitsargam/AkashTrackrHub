import React from 'react';

export default function Community() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={"https://example.com"}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Embedded Page"
      />
    </div>
  );
}
