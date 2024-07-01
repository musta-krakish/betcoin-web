"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Home.module.css"; 
import Image from "next/image"
import { TelegramProvider, useTelegram } from "./components/TelegramProvider";


interface indicators {
  id: number;
  top: string;
  left: string;
}

export default function Home() {
  const [totalClicks, setTotalClicks] = useState(500);
  const [remainsClick, setRemainsClick] = useState(500);
  const [currentClick, setCurrentClick] = useState(0);
  const [income, setIncome] = useState(0);
  const [indicators, setIndicators] = useState<indicators[]>([]);
  const [touchCount, setTouchCount] = useState(0);

  function vibrate() {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }

  const { user, webApp } = useTelegram();



  const clicked = useCallback(() => {
    if (remainsClick <= 0) {
      return;
    } else {
      setRemainsClick(remainsClick - 1);
      setCurrentClick(currentClick + 1);
      setIncome(income + 1);

      const newIndicator: indicators = {
        id: Date.now(),
        top: Math.random() * 80 + 10 + "%",
        left: Math.random() * 80 + 10 + "%",
      };

      setIndicators((prev) => [...prev, newIndicator]);

      setTimeout(() => {
        setIndicators((prev) => prev.filter((i) => i.id !== newIndicator.id));
      }, 500);

      const ballElement = document.getElementById("ball");
      ballElement?.classList.add(styles.shake);
      setTimeout(() => {
        ballElement?.classList.remove(styles.shake);
      }, 500);

      vibrate();
    }
  }, [remainsClick]);



  const handleClick = () => {
    if (!("ontouchstart" in window)) {
      clicked();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchCount(e.touches.length);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      for (let i = 0; i < touchCount; i++) {
        clicked();
      }
      setTouchCount(0);
    } else {
      setTouchCount(e.touches.length);
    }
  };

  const getBackground = () => {
    const percentage = (currentClick / totalClicks) * 100;
    return `linear-gradient(to right, #eed919 0%, #f76628 ${percentage}%, gray ${percentage}%)`;
  };

  return (
    <TelegramProvider>
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Верхний блок */}
      <div className="text-center text-white space-y-5 m-5 z-10 w-full">
        <button className="button-shop text-center text-xs py-2 px-24 rounded-lg font-bold h-12 w-[95%] active:scale-95">
          {user?.id}
        </button>
        <div className="mt-4 text-xs flex flex-col gap-3">
          <p>
            ЭНЕРГИЯ: {remainsClick}/{totalClicks} (24ч)
          </p>
          <p>БАЛАНС: {income} $BETC</p>
        </div>
      </div>

      {/* Блок кликера */}
      <div className="flex items-center justify-center h-[90%] w-[90%] m-auto rounded-full">
        <Image
          id="ball"
          className="w-[90%] h-[90%] rounded-full"
          src={"/ball.svg"}
          width={300}
          height={300}
          alt="ball"
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        ></Image>
        {indicators.map((indicator) => (
          <img
            key={indicator.id}
            className="indicator"
            style={{ top: indicator.top, left: indicator.left }}
            src="/+1.svg"
          />
        ))}
      </div>

      {/* Нижний блок */}
      <div className="flex flex-col items-center text-center text-white text-nowrap space-y-4 z-10 mb-10 w-full h-48">
        <button
          style={{
            background: getBackground(),
          }}
          onClick={() => {
            if (remainsClick === 0) {
              // сюда написать чё будет делать после того как заполниться
            }
          }}
          className={`button-shop rounded-lg font-bold block text-xs py-3 px-4 w-[95%] h-14 ${
            remainsClick === 0 ? "active:scale-95" : ""
          }`}
        >
          ЗАБРАТЬ $BETCOINЫ
        </button>
        <button className="button-sobitiya rounded-lg font-bold block text-xs py-3 px-4 w-[95%] h-14 active:scale-95">
          ПРЕДСКАЗАТЬ СОБЫТИЯ
        </button>
        <button className="button-postavit rounded-lg font-bold block text-xs py-3 px-4 w-[95%] h-14 active:scale-95">
          ПОСТАВИТЬ
        </button>
      </div>
    </div>
    </TelegramProvider>
  );
}
