'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function CardItem(props: { item: unknown }) {
  const { item } = props;
  const pathname = usePathname();
  const { push } = useRouter();
  const goToEventPage = (id:number) => {
    push(`event/${id}`);
  }
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          {item.category}
        </CardDescription>
        <div className="relative w-full aspect-[4/3]">
          {!item.media || item.media.link === '' ? null : (
            <Image
            src={item.media.link}
            fill
            alt="coming soon"
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          ) }
          
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{item.media.title}</CardTitle>
        <CardDescription>{item.dateNext}</CardDescription>
        <div>{item.place}</div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => goToEventPage(item.id)}>Go to event</Button>
      </CardFooter>
    </Card>
  );
}
