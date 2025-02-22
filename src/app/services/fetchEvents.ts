import { format } from "date-fns";
 
 export type EventType = {
   id: number,
  locationName: string,
  category:string,
  isFree: boolean,
  place: string,
  coordinates: {
    lat: number,
    lon: number,
    title: string
  }
  media: {
    link: string,
    title: string,
  },
  prices: {
    type: string,
    value: number | string
  }[] | [],
  dateNext: string
 }

 export const fetchEvents = async(date:string): Promise<EventType[]> => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${process.env.API_ACCESS_TOKEN}`);

    var requestOptions = {
      headers,
      method: 'GET',
      redirect: 'follow'
    } as RequestInit;

    const newDate = new Date(date) || new Date();
    const res = await fetch(`${process.env.API_URL}/date?date=${format(newDate, 'yyyy-MM-dd')}`, requestOptions);
    if(!res.ok) {
      throw new Error('Failed to fetch events')
    }
    const resJson = await res.json();
    return adaptEvents(resJson.response.results.event);
  }


  export const adaptEvents = (events: unknown[]): EventType[] => {
    const newData = events.map(item => {
      const mediaItem = Array.isArray(item?.media)
        ? item.media.find((i) => i.type === "photo")
        : item.media;
      return({
        id: item.id,
        locationName: item?.place?.translations?.en?.name || '',
        category: item?.categories?.main?.translations?.en || '',
        isFree: item?.is_free || false,
        place: item?.place.translations.en.name,
        coordinates: {
          lat: item.place.location.lat,
          lon: item.place.location.lon,
          title: item.place.translations.en.name
        },
        media: {
          link: mediaItem?.link || '',
          title: mediaItem?.translations.en.title,
        },
        prices: item?.is_free ? [] :  Array.isArray(item.prices) ? item.prices.map(price => ({
          type: price.translations.en.name,
          value: price.value
        })) : [],
        dateNext: item.date_next
      })
    });
    return newData;
  }