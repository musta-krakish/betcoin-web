export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: "url('/bg.svg')",
          transform: "scale(1.3)",
          filter: "blur(15px)"
        }}
      ></div>

      {/* Верхний блок */}
      <div className="text-center text-white space-y-4 z-10">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 py-2 px-6 rounded font-bold">МАГАЗИН</button>
        <div className="mt-4 text-xl">
          <p>ЭНЕРГИЯ: 0/1000 (24ч)</p>
          <p>БАЛАНС: 325,5 $BETC</p>
        </div>
      </div>

      {/* Блок кликера */}
      <div className="flex items-center justify-center h-64 w-64 relative">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: "url('/ball.svg')",
          }}
        ></div>
      </div>

      {/* Нижний блок */}
      <div className="relative text-center text-white space-y-4 z-10 mt-auto mb-10">
        <button className="bg-orange-400 py-2 px-4 rounded-full font-bold">ЗАБРАТЬ $BETCOINЫ</button>
        <button className="bg-blue-400 py-2 px-4 rounded-full font-bold">ПРЕДСКАЗАТЬ СОБЫТИЯ</button>
        <button className="bg-purple-400 py-2 px-4 rounded-full font-bold">ПОСТАВИТЬ</button>
      </div>
    </div>
  );
}
