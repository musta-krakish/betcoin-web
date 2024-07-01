import { useInitData } from "@tma.js/sdk-react";
import { FC, useCallback, useEffect, useState } from "react";
import styles from "./Home.module.css";

interface indicators {
  id: number;
  top: string;
  left: string;
}

const Home: FC = () => {
  const totalClicks = 500;
  const [remainsClick, setRemainsClick] = useState(500);
  const [currentClick, setCurrentClick] = useState(0);
  const [income, setIncome] = useState(0);
  const [indicators, setIndicators] = useState<indicators[]>([]);
  const [touchCount, setTouchCount] = useState(0);
  const [user, setUser] = useState(0);

  function vibrate() {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }

  const innitData = useInitData();

  useEffect(() => {
    setUser(innitData?.user?.id || 0);
  }, []);

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
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* Верхний блок */}
        <div className="z-10 m-5 w-full space-y-5 text-center text-white">
          <button className="button-shop h-12 w-[95%] rounded-lg px-24 py-2 text-center text-xs font-bold active:scale-95">
            {user}
          </button>
          <div className="mt-4 flex flex-col gap-3 text-xs">
            <p>
              ЭНЕРГИЯ: {remainsClick}/{totalClicks} (24ч)
            </p>
            <p>БАЛАНС: {income} $BETC</p>
          </div>
        </div>

        {/* Блок кликера */}
        <div className="m-auto flex h-[90%] w-[90%] items-center justify-center rounded-full">
          <img
            id="ball"
            className="h-[90%] w-[90%] rounded-full"
            src={"/ball.svg"}
            width={300}
            height={300}
            alt="ball"
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
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
        <div className="text-nowrap z-10 mb-10 flex h-48 w-full flex-col items-center space-y-4 text-center text-white">
          <button
            style={{
              background: getBackground(),
            }}
            onClick={() => {
              if (remainsClick === 0) {
                // сюда написать чё будет делать после того как заполниться
              }
            }}
            className={`button-shop block h-14 w-[95%] rounded-lg px-4 py-3 text-xs font-bold ${
              remainsClick === 0 ? "active:scale-95" : ""
            }`}
          >
            ЗАБРАТЬ $BETCOINЫ
          </button>
          <button className="button-sobitiya block h-14 w-[95%] rounded-lg px-4 py-3 text-xs font-bold active:scale-95">
            ПРЕДСКАЗАТЬ СОБЫТИЯ
          </button>
          <button className="button-postavit block h-14 w-[95%] rounded-lg px-4 py-3 text-xs font-bold active:scale-95">
            ПОСТАВИТЬ
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
