import { format } from "date-fns";

export type PaginationType = {
  page: number;
  pageCount: number;
  resultCount: number;
};
export type EventType = {
  id: number;
  locationName: string;
  category: string;
  isFree: boolean;
  place: string;
  coordinates: {
    lat: number;
    lon: number;
    title: string;
  };
  media: {
    link: string;
    title: string;
  };
  prices:
    | {
        type: string;
        value: number | string;
      }[]
    | [];
  dateNext: string;
  agendaUrl: string;
};

export type EventsResponse = {
  data: EventType[];
  pagination: PaginationType;
};

export const fetchEvents = async ({
  date,
  page,
}: {
  date?: string;
  page?: string;
}): Promise<EventsResponse> => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${process.env.API_ACCESS_TOKEN}`);

  const requestOptions = {
    headers,
    method: "GET",
    redirect: "follow",
  } as RequestInit;

  const dateSelected = date ? new Date(date) : new Date();
  const pageSelected = page || "1";
  const res = await fetch(
    `${process.env.API_URL}/date?date=${format(dateSelected, "yyyy-MM-dd")}&page=${pageSelected}`,
    requestOptions,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  const resJson = await res.json();
  const eventData = adaptEvents(resJson.response.results.event);
  return {
    data: eventData,
    pagination: {
      page: resJson.response.page,
      pageCount: resJson.response.pageCount,
      resultCount: resJson.response.resultCount,
    },
  };
};

export const adaptEvents = (events: any[]): EventType[] => {
  const newData = events.map((item) => {
    const mediaItem = Object.keys(item).includes("media")
      ? Array.isArray(item.media)
        ? item.media.find((i: { type: string }) => i.type === "photo")
        : item.media
      : {};
    return {
      id: item.id,
      locationName: item?.place?.translations?.en?.name || "",
      category: item?.categories?.main?.translations?.en || "",
      isFree: item?.is_free || false,
      place: item?.place.translations.en.name,
      coordinates: {
        lat: item.place.location.lat,
        lon: item.place.location.lon,
        title: item.place.translations.en.name,
      },
      media: {
        link: mediaItem?.link || "",
        title: mediaItem?.translations.en.title || "unknown",
      },
      prices: item?.is_free
        ? []
        : Array.isArray(item.prices)
          ? item.prices.map(
              (price: {
                translations: { en: { name: string } };
                value: number;
              }) => ({
                type: price.translations.en.name,
                value: price.value,
              }),
            )
          : [],
      dateNext: item.date_next,
      agendaUrl: item.translations.en.agenda_url,
    };
  });
  return newData;
};
