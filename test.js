import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Maria');

  useEffect(() => {
    console.log(`Count changed to ${count}`);
  }, [count]); // ✅ Now runs every time 'count' changes

  return (
    <div>
      <p>{name} clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setName('John')}>Change Name</button>
    </div>
  );
}
