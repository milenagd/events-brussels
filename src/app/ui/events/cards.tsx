import React from "react";
import { EventType } from "@/app/services/fetchEvents";
import CardItem from "./cardItem";

export default function Cards(props: { data: EventType[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {props.data.map((item, index) => {
        if (item.media) {
          return <CardItem key={`cardItem-${index}`} item={item} />;
        }
      })}
    </div>
  );
}
