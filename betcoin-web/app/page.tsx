"use client";

import { useState } from "react";
import styles from "./Home.module.css"; // Создайте файл Home.module.css для стилей
import Image from "next/image";

export default function Home() {
  const [totalClicks, setTotalClicks] = useState(500);
  const [curentClick, setCurentClick] = useState(500);
  const [income, setIncome] = useState(0);

  const handleClick = () => {
    if (curentClick <= 0) {
    } else {
      setCurentClick(curentClick - 1);
      setIncome(income + 1);
      const ballElement = document.getElementById("ball");
      ballElement?.classList.add(styles.shake);
      setTimeout(() => {
        ballElement?.classList.remove(styles.shake);
      }, 500);
      navigator.vibrate(100);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Верхний блок */}
      <div className="text-center text-white space-y-5 m-5 z-10 ">
        <button className="button-shop text-center text-xs py-2 px-24 rounded-lg font-bold max-w-[350px] h-12 shadow-xl ">
          МАГАЗИН
        </button>
        <div className="mt-4 text-xs flex flex-col gap-3">
          <p>
            ЭНЕРГИЯ: {curentClick}/{totalClicks} (24ч)
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
      </div>

      {/* Нижний блок */}
      <div className="flex flex-col items-center text-center text-white text-nowrap space-y-4 z-10 mb-10 max-w-[350px]">
        <button className="button-shop rounded-lg font-bold block text-xs py-3 px-4 w-full h-full ">
          ЗАБРАТЬ $BETCOINЫ
        </button>
        <button className="button-sobitiya rounded-lg font-bold block text-xs py-3 px-4 w-full h-full ">
          ПРЕДСКАЗАТЬ СОБЫТИЯ
        </button>
        <button className="button-postavit rounded-lg font-bold block text-xs py-3 px-4 w-full h-full ">
          ПОСТАВИТЬ
        </button>
      </div>
    </div>
  );
}
