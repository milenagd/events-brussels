import { Suspense } from "react";

import Cards from "./ui/events/cards";
import Filters from "./ui/events/filters";
import { applyFilters } from "./lib/filter";
import { fetchEvents } from "./services/fetchEvents";
import Map2 from "./ui/events/map";

export type QueryParamsType = {
  location?: string;
  category?: string;
  isFree?: string;
  date?: string;
};
export type HomeProps = {
  searchParams?: Promise<QueryParamsType>;
};

export default async function Page(props: HomeProps) {
  const searchParams = await props?.searchParams;
  const location = searchParams?.location || "";
  const category = searchParams?.category || "";
  const isFree = searchParams?.isFree || "";
  const date = searchParams?.date || "";

  const realData = await fetchEvents(date);

  const filteredData = applyFilters(realData, { location, category, isFree });
  const locations = realData.map((i) => ({
    id: i.id,
    lat: i.coordinates.lat,
    lon: i.coordinates.lon,
    title: i.coordinates.title,
  }));
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gradient-to-r from-black via-yellow-400 to-red-600 text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">What's up Brussels?</div>
        </div>
      </header>
      <div className="p-4 flex-shrink-0">
        {/* Filters Section */}
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>
        <Filters data={filteredData} />
      </div>
      <div className="flex flex-1 mt-[300px]">
        <div className="w-full sm:w-1/2 p-4">
          <div className="relative rounded-xl border-8 border-black overflow-hidden w-full h-screen shadow-xl">
            <Map2 locations={locations} />
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 overflow-y-auto h-screen">
          <div className="space-y-4">
            <Suspense key="list-of-cards" fallback={<h1>Loading...</h1>}>
              <Cards data={filteredData} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
