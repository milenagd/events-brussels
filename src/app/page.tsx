import { Suspense } from "react";

import Cards from "./ui/events/cards";
import Filters from "./ui/events/filters";
import { CustomPagination } from "./ui/events/pagination";
import { applyFilters } from "./lib/filter";
import { fetchEvents } from "./services/fetchEvents";
import MapEvents from "./ui/events/map";
import { ScrollArea } from "@/components/ui/scroll-area";

export type QueryParamsType = {
  location?: string;
  category?: string;
  isFree?: string;
  date?: string;
  page?: string;
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
  const page = searchParams?.page || "1";

  const { data, pagination } = await fetchEvents({ date, page });

  const filteredData = applyFilters(data, { location, category, isFree });
  const locations = data.map((i) => ({
    id: i.id,
    lat: i.coordinates.lat,
    lon: i.coordinates.lon,
    title: i.coordinates.title,
  }));
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white p-4 shadow-md text-xl font-semibold">
        What's up Brussels?
      </header>

      <div className="flex flex-grow gap-4 p-4 flex-wrap md:flex-nowrap md:flex-row">
        <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-xl shadow-lg">
          <Filters data={filteredData} />
        </aside>

        <div className="flex flex-col w-full ml:flex-row md:flex-grow">
          <main className="w-full ml:w-1/2 h-80 ml:h-full bg-gray-200 rounded-xl shadow-lg overflow-hidden mb-4 md:mb-0">
            <MapEvents locations={locations} />
          </main>

          <section className="w-full ml:w-1/2 bg-white p-4 rounded-xl shadow-lg overflow-y-auto h-full">
            <div className="space-y-4">
              <CustomPagination pagination={pagination} />
              <Suspense key="list-of-cards" fallback={<h1>Loading...</h1>}>
                <ScrollArea className="h-[87vh]">
                  <Cards data={filteredData} />
                </ScrollArea>
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
