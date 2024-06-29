"use client"

import { useState } from "react";
import styles from "./Home.module.css"; // Создайте файл Home.module.css для стилей

export default function Home() {
  const [totalClicks, setTotalClicks] = useState(10);
  const [curentClick, setCurentClick] = useState(10);
  const [income, setIncome] = useState(0);

  const handleClick = () => {
    if (curentClick <= 0) {
    } else {
      setCurentClick(curentClick - 1);
      setIncome(income + 1);
      navigator.vibrate(100); 
      const ballElement = document.getElementById("ball");
      ballElement?.classList.add(styles.shake);
      setTimeout(() => {
        ballElement?.classList.remove(styles.shake);
      }, 500); 
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: "url('/bg.svg')",
          transform: "scale(1.3)",
          filter: "blur(15px)",
        }}
      ></div>

      {/* Верхний блок */}
      <div className="text-center text-white space-y-5 m-5 z-10 ">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 py-2 px-24 rounded font-bold">
          МАГАЗИН
        </button>
        <div className="mt-4 text-xl">
          <p>ЭНЕРГИЯ: {curentClick}/{totalClicks} (24ч)</p>
          <p>БАЛАНС: {income} $BETC</p>
        </div>
      </div>

      {/* Блок кликера */}
      <div className="flex items-center justify-center h-64 w-64 relative">
        <div
          id="ball"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/ball.svg')",
          }}
          onClick={handleClick}
        ></div>
      </div>

      {/* Нижний блок */}
      <div className="relative text-center text-white space-y-4 z-10 mt-auto mb-10">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded font-bold block w-15">
          ЗАБРАТЬ $BETCOINЫ
        </button>
        <button className="bg-gradient-to-r from-blue-400 to-blue-500 rounded font-bold block w-15">
          ПРЕДСКАЗАТЬ СОБЫТИЯ
        </button>
        <button className="bg-gradient-to-r from-purple-400 to-purple-500 rounded font-bold block w-15">
          ПОСТАВИТЬ
        </button>
      </div>
    </div>
  );
}
