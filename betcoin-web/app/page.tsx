"use client";

import { useState } from "react";
import styles from "./Home.module.css"; // Создайте файл Home.module.css для стилей
import Image from "next/image";

interface indicators {
  id: any;
  top: any;
  left: any;
}

export default function Home() {
  const [totalClicks, setTotalClicks] = useState(500);
  const [remainsClick, setRemainsClick] = useState(500);
  const [currentClick, setCurrentClick] = useState(0);
  const [income, setIncome] = useState(0);
  const [indicators, setIndicators] = useState<indicators[]>([]);

  const handleClick = () => {
    if (remainsClick <= 0) {
    } else {
      setRemainsClick(remainsClick - 1);
      setCurrentClick(currentClick + 1);
      setIncome(income + 1);
      const newIndicator = {
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
      navigator.vibrate(100);
    }
  };

  const getBackground = () => {
    const percentage = (currentClick / totalClicks) * 100;
    return `linear-gradient(to right, #eed919 0%, #f76628 ${percentage}%, gray ${percentage}%)`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Верхний блок */}
      <div className="text-center text-white space-y-5 m-5 z-10 ">
        <button className="button-shop text-center text-xs py-2 px-24 rounded-lg font-bold max-w-[350px] h-12 shadow-xl active:scale-95">
          МАГАЗИН
        </button>
        <div className="mt-4 text-xs flex flex-col gap-3">
          <p>
            ЭНЕРГИЯ: {remainsClick}/{totalClicks} (24ч)
          </p>
          <p>БАЛАНС: {income} $BETC</p>
        </div>
      </div>

      {/* Блок кликера */}
      <div className="flex items-center justify-center max-h-64 max-w-64 m-auto">
        <Image
          id="ball"
          className="w-64 h-64"
          src={"/ball.svg"}
          width={300}
          height={300}
          alt="ball"
          onClick={handleClick}
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
      <div className="flex flex-col items-center text-center text-white text-nowrap space-y-4 z-10 mb-10 max-w-[350px]">
        <button
          style={{
            background: getBackground(),
          }}
          onClick={() => {
            if (remainsClick === 0) {
              // сюда написать чё будет делать после того как заполниться
            }
          }}
          className={`button-shop rounded-lg font-bold block text-xs py-3 px-4 w-full h-full ${
            remainsClick === 0 ? "active:scale-95" : ""
          }`}
        >
          ЗАБРАТЬ $BETCOINЫ
        </button>
        <button className="button-sobitiya rounded-lg font-bold block text-xs py-3 px-4 w-full h-full active:scale-95">
          ПРЕДСКАЗАТЬ СОБЫТИЯ
        </button>
        <button className="button-postavit rounded-lg font-bold block text-xs py-3 px-4 w-full h-full active:scale-95">
          ПОСТАВИТЬ
        </button>
      </div>
    </div>
  );
}
