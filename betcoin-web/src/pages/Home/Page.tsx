import { useInitData } from "@tma.js/sdk-react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Home.module.css";
import { MainApi } from "@/app/api-service";
import { initMiniApp, postEvent } from "@tma.js/sdk";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";


const DEBUG = false;

interface indicators {
  id: number;
  top: string;
  left: string;
}

const postClick = async (user: number) => {
  await MainApi.postTap(user);
};
const totalClicks = 500;

const Home: FC = () => {
  const debugDialogRef = useRef<HTMLDialogElement>(null);
  const setDebugOpen = (open: boolean) => {
    if (open) {
      debugDialogRef.current?.show();
    } else {
      debugDialogRef.current?.close();
    }
  };

  const [remainsClick, setRemainsClick] = useState(totalClicks);
  // const [currentClick, setCurrentClick] = useState(0);
  const currentClick = useMemo(() => {
    return totalClicks - remainsClick;
  }, [remainsClick]);
  const [income, setIncome] = useState(0);
  const [indicators, setIndicators] = useState<indicators[]>([]);
  const [touchCount, setTouchCount] = useState(0);
  const [leftTime, setLeftTime] = useState(0);
  const timerRef = useRef<number>();
  const [user, setUser] = useState(0);
  // const [latestFetch, setLatestFetch] = useState("");
  const latestFetchRef = useRef("");
  // const [reward, setReward] = useState(false);

  const [miniApp] = initMiniApp();

  const navigate = useNavigate()

  function vibrate() {
    postEvent("web_app_trigger_haptic_feedback", {
      type: "notification",
      notification_type: "success",
    });
  }

  function formatTime(seconds: number) {
    // return `${typeof seconds} ${seconds}`; // temp
    if (seconds === -1 || remainsClick > 0 || seconds === 0) return "";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}ч ${minutes}м`;
  }

  const initData = useInitData();

  useEffect(() => {
    const userId = initData?.user?.id || 0;
    setUser(userId);

    const fetchData = async () => {
      const fetch = uuidv4();
      latestFetchRef.current = fetch;

      const remainsPromise = MainApi.getEnergy(userId);
      const guccyPromise = MainApi.getGuccy(userId);
      const timePromise = MainApi.getRenewTime(userId);
      const [time, guccy, remains] = await Promise.all([
        timePromise,
        guccyPromise,
        remainsPromise,
      ]);

      if (fetch !== latestFetchRef.current) return;

      const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = undefined;
      };

      const launchTimer = async () => {
        resetTimer();
        if (remains > 0) {
          setLeftTime(0);
          return;
        }
        if (time === -1) {
          return;
        }
        if (time < -1) {
          setLeftTime(0);
          MainApi.getEnergy(userId).then((r) => setRemainsClick(r));
          return;
        }
        timerRef.current = setInterval(() => {
          setLeftTime((time) => {
            if (time === 0) {
              resetTimer();
              MainApi.getEnergy(userId).then((r) => setRemainsClick(r));
              return 0;
            } else return time - 1;
          });
        }, 1000);
      };

      setLeftTime(time);
      setIncome(guccy);
      setRemainsClick(remains);
      launchTimer();
    };

    if (userId !== 0) {
      fetchData();
    }
  }, [initData, user]);

  const clicked = useCallback(async () => {
    if (remainsClick <= 0) {
      return;
    } else {
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
      postClick(user);
      vibrate();

      if (remainsClick - 1 <= 0) {
        // await MainApi.postReward(user);
        // setReward(true);
        await MainApi.postTap(user);
        // miniApp.close();
      }

      setRemainsClick(remainsClick - 1);
    }
  }, [remainsClick, miniApp, user]);

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

  const predictEvents = async () => {
    await MainApi.postFermi(user);
    miniApp.close();
  };

  const onRewardClick = async () => {
    if (remainsClick > 0) return;
    await MainApi.collectReward(user);
    miniApp.close();
  };

  const handleGoToSore = () => {
    navigate("/store")
  }

  return (
    <>
      <div
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
        }}
        className="flex min-h-screen flex-col items-center justify-center"
      >
        {DEBUG && (
          <button
            className="absolute right-0 top-0 h-5 w-5"
            onClick={() => setDebugOpen(true)}
          >
            d
          </button>
        )}
        {/* Верхний блок */}
        <div className="z-10 m-5 w-full space-y-5 text-center text-white">
          <button
            onClick={handleGoToSore}
            className="button-shop relative h-12 w-[95%] rounded-lg px-24 py-2 text-center text-xs font-bold"
          >
            <div
              style={{
                opacity: "0.45",
              }}
            >
              МАГАЗИН
            </div>
          </button>
          <div className="mt-4 flex flex-col gap-3 text-xs">
            <p>
              ЭНЕРГИЯ: {remainsClick}/{totalClicks} {formatTime(leftTime)}
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
            className={`button-shop block h-14 w-[95%] rounded-lg px-4 py-3 text-xs font-bold ${
              remainsClick === 0 ? "active:scale-95" : ""
            }`}
            onClick={onRewardClick}
          >
            ЗАБРАТЬ $BETCOINЫ
          </button>
          <button
            onClick={predictEvents}
            className="button-sobitiya block h-14 w-[95%] rounded-lg px-4 py-3 text-xs font-bold active:scale-95"
          >
            ПРЕДСКАЗАТЬ СОБЫТИЯ
          </button>
          <button
            disabled
            className="button-postavit relative block h-14 w-[95%] rounded-lg px-4 py-3 text-xs font-bold"
          >
            <div
              style={{
                opacity: "0.45",
              }}
            >
              ПОСТАВИТЬ
            </div>
            <div
              style={{
                opacity: "0.45",
                fontSize: "10px",
              }}
              className="absolute bottom-4 right-4"
            >
              Soon...
            </div>
          </button>
        </div>
      </div>
      {DEBUG && (
        <dialog
          ref={debugDialogRef}
          className="left-0 top-0 z-40 h-screen w-screen flex-col bg-slate-800 backdrop:bg-slate-900/75 open:flex"
        >
          <button
            className="h-5 w-5 self-end"
            onClick={() => setDebugOpen(false)}
          >
            x
          </button>
          <div className="grow overflow-auto">
            <pre>{JSON.stringify(initData, null, 2)}</pre>
            <pre>
              {JSON.stringify(
                {
                  user,
                  remainsClick,
                  income,
                  leftTime,
                  indicators,
                  touchCount,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Home;
