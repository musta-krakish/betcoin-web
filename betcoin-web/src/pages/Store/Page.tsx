import { useInitData } from "@tma.js/sdk-react";
import { MainApi } from "@/app/api-service";
import { FC, useEffect, useState } from "react";
import { Oleg } from "@/app/types";
import { useNavigate } from "react-router-dom";
import { initMiniApp } from "@tma.js/sdk";

const Store: FC = () => {
    const [olegs, setOlegs] = useState<Oleg[]>([]);
    const [income, setIncome] = useState(0);
    const [selectedOleg, setSelectedOleg] = useState<Oleg | null>(null);
    const initData = useInitData();
    const navigate = useNavigate();
    const [miniApp] = initMiniApp();

    useEffect(() => {
        const userId = initData?.user?.id || 0;

        const fetchData = async () => {
            try {
                const data = await MainApi.getOleg();
                setOlegs(data);
                const gucchi = await MainApi.getGuccy(userId);
                setIncome(gucchi);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [initData]);

    const handlePurchase = async (price: number, _id: string) => {
        setSelectedOleg(olegs.find(item => item.id === _id) || null);
        if (income < price) {
            alert("Недостаточно средств для покупки.");
            setSelectedOleg(null);
        }
    };

    const confirmPurchase = async () => {
        if (selectedOleg) {
            await MainApi.buyOleg(selectedOleg.id, initData?.user?.id || 0);
            setSelectedOleg(null); // Сбросить выбранный товар
            miniApp.close();
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div
            style={{
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
            }}
            className="flex min-h-screen flex-col items-center justify-center"
        >
            <div
                style={{
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    minHeight: "100vh",
                    padding: "20px",
                    color: "white",
                }}
                className="flex flex-col items-center relative"
            >
                <div className="z-10 w-full mb-5 text-center">
                    <button
                        className="relative h-12 w-[95%] rounded-lg px-24 py-2 text-center text-xs font-bold bg-gradient-to-tr from-[#1C1E34] to-[#31344C]"
                    >
                        МАГАЗИН
                    </button>
                    <div className="mt-4 flex flex-col gap-3 text-xs">
                        <p>БАЛАНС: {income} $BETC</p>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full space-y-5 overflow-y-auto max-h-[60vh]">
                    {olegs.length > 0 ? (
                        olegs.map((item: Oleg) => (
                            <div
                                key={item.id}
                                className={`w-[95%] rounded-lg p-5 ${item.count === 0 ? 'bg-gray-500' : 'bg-gradient-to-tr from-[#1C1E34] to-[#31344C]'}`}
                            >
                                <div className="flex flex-col items-center">
                                    {item.media && item.media.photo ? (
                                        <img
                                            src={item.media.photo.startsWith('data:image/') ? item.media.photo : `https://api.tonbetcoin2024webapp.ru/microvawe/images/${item.media.photo}`}
                                            alt={item.name}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">Нет изображения</span>
                                        </div>
                                    )}
                                    <div className="text-lg w-full flex justify-center py-2 rounded-lg bg-gradient-to-tr from-[#716EFF] to-[#5667FD] font-bold mt-2">
                                        {item.name}
                                    </div>
                                    <div className="text-xs mt-2 mb-4 text-center">{item.description}</div>
                                    <div className="text-xs italic line-through">{item.price} $BETC</div>
                                </div>
                                <button
                                    onClick={() => handlePurchase(item.price, item.id)}
                                    className={`mt-4 h-12 w-full py-2 rounded-lg text-white ${item.count === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-tr from-[#69F314] to-[#0CBA13]'}`}
                                    disabled={item.count === 0} // Отключаем кнопку, если count равно 0
                                >
                                    КУПИТЬ
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm">Нет доступных товаров</p>
                    )}
                </div>

                <div className="fixed bottom-1 items-center left-1/2 transform -translate-x-1/2 w-[95%]">
                    <button
                        className={`h-12 w-[95%] ml-[2.5%] py-2 rounded-lg text-white ${selectedOleg ? 'bg-gradient-to-tr from-[#69F314] to-[#0CBA13]' : 'bg-gradient-to-tr from-[#51535C] to-[#4F566B]'}`}
                        onClick={confirmPurchase}
                        disabled={!selectedOleg}
                    >
                        ПОДТВЕРДИТЬ ПОКУПКУ
                    </button>
                    
                    <button
                        className="h-12 w-[95%] mt-1 ml-[2.5%] py-2 bg-gradient-to-tr from-[#51535C] to-[#4F566B] rounded-lg text-white"
                        onClick={handleBack}
                    >
                        НАЗАД
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Store;
