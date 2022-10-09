import React, { useState } from 'react';
import { GrAdd, GrSubtract } from "react-icons/gr";

function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(c => Math.min(c + 1, 10));
    const decrement = () => setCount(c => Math.max(c - 1, 0));
    return (
        <div>
            <GrSubtract onClick={decrement} />
            <span>{count}</span>
            <GrAdd onClick={increment} />
        </div>
    );
}
export default Counter;