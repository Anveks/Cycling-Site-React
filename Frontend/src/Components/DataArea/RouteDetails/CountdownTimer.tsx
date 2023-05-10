import React, { useEffect, useState } from "react";

function CountdownTimer(props: any) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const now = new Date().getTime();
    const dueDate = new Date(props.date).getTime();
    let timeLeft = dueDate - now;

    if (timeLeft <= 0) {
      setCountdown("Time's up!");
      return;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Format the countdown display
    const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    setCountdown(countdownText);

    const interval = setInterval(() => {
      timeLeft -= 1000;

      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown("Time's up!");
        return;
      }

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Format the countdown display
      const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setCountdown(countdownText);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="starTimeout">{countdown}</div>;
}

export default CountdownTimer;