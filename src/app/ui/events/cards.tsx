import React from "react";
import CardItem from "./cardItem";

export default function Cards(props: { data: unknown[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.data.map((item, index) => {
        if (item && item.media) {
          return <CardItem key={`cardItem-${index}`} item={item} />;
        }
      })}
    </div>
  );
}
