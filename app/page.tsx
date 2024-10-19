"use client";
import { useState } from "react";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import Humidity from "./Components/Humidity/Humidity";
import Pressure from "./Components/Pressure/Pressure";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import Wind from "./Components/Wind/Wind";
import { useGlobalContext, useGlobalContextUpdate } from "./context/globalContext";
import defaultStates from "./utils/defaultStates";

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const { setTemperatureUnit, setThreshold } = useGlobalContext();
  const [threshold, setThresholdValue] = useState<string>("");
  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleThresholdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setThreshold(threshold);
  }

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto mt-5">

      <div className="grid grid-cols-2 max-[530px]:grid-cols-1 relative">
        <div className="search-container flex flex-col shrink-0 w-full gap-2 sm:w-fit mb-5">
          <div className="text-sm text-muted-foreground">
            Set Threshold Temp in K
          </div>
          <form onSubmit={handleThresholdSubmit} className="flex max-sm:w-full">
            <input value={threshold} onChange={(e) => setThresholdValue((e.target.value))} type="text" className="rounded-s-sm outline-none h-7 border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200" />
            <button type="submit" style={{
              height: 'calc(1.75rem - 1px)'
            }} className="w-14 bg-black text-white rounded-e-sm">Set  </button>

          </form>
        </div>
        <div className="w-80 max-[530px]:mb-5 h-7 flex justify-around max-[530px]:justify-between">
          <div className="text-sm text-muted-foreground">
            Set Temperature Unit
          </div>
          <button onClick={() => setTemperatureUnit("°C")} className="w-10 bg-black text-white rounded-sm" > °C </button>
          <button onClick={() => setTemperatureUnit("K")} className="w-10 bg-black text-white rounded-sm" > K </button>
        </div>
      </div>
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          {/* <div className="mapbox-con mt-4 flex gap-4">
            <div className="states flex flex-col gap-3 flex-1">
              
            </div>
          </div> */}
        </div>

        <div className="flex flex-col h-full w-full">
          <div className="instruments grid gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <Sunset />
            <Wind />
            <FeelsLike />
            <Humidity />
            <Pressure />
          </div>

        </div>

      </div>
      <h2 className="flex items-center font-medium">
        Top Large Cities
      </h2>
      <div className="mt-5 grid grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-3 max-[430px]:grid-cols-2 h-14 gap-4">
        {defaultStates.map((state, index) => {
          return (
            <div
              key={index}
              className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
              onClick={() => {
                getClickedCityCords(state.lat, state.lon);
              }}
            >
              <p className="text-center whitespace-nowrap px-4 py-4">{state.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
