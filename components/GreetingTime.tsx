"use client";

import { useEffect, useState } from "react";

const GreetingTime = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <div>
      <h1 className="text-white text-3xl font-semibold">{greeting}</h1>
    </div>
  );
};

export default GreetingTime;
