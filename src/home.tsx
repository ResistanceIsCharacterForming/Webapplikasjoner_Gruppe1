  "use client";

    import { useEffect, useState } from 'react';

    export default function MyClientComponent() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        console.log('Client component mounted!');
      }, []);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }