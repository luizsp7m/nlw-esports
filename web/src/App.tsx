import logoImg from "./assets/logo-nlw-esports.svg";

import { MagnifyingGlassPlus } from "phosphor-react";

function GameCard() {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src="/game-1.png" alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 inset-x-0">
        <strong className="font-bold text-white block">League of Legends</strong>
        <span className="text-zinc-300 text-sm block">4 anúncios</span>
      </div>
    </a>
  );
}

export function App() {
  return (
    <h1 className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {Array.from(Array(6)).map((item, index) => (
          <GameCard key={index} />
        ))}
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </h1>
  );
}