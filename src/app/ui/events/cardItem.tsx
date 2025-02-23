import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { EventType } from "@/app/services/fetchEvents";

export default function CardItem(props: { item: EventType }) {
  const { item } = props;

  return (
    <Card className="max-w-sm min-w-[200px] hover:scale-105 transition-all duration-300">
      <CardHeader>
        <CardDescription>{item.category}</CardDescription>
        <div className="relative w-full aspect-[4/3]">
          {!item.media || item.media.link === "" ? null : (
            <Image
              src={item.media.link}
              fill
              alt="coming soon"
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="truncate">{item.media.title}</CardTitle>
        <CardDescription>{item.dateNext}</CardDescription>
        <div>{item.place}</div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link
            href={item.agendaUrl}
            className={buttonVariants({ variant: "outline" })}
          >
            Event info
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
