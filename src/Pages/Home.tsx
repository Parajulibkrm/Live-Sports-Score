import { Avatar, Badge, Container, Group, ScrollArea } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import SportsPill from "../Components/SportsPill";
import autoAnimate from "@formkit/auto-animate";
import CarouselGames from "../Components/CarouselGames";
import MatchListItem from "../Components/MatchListItem";

const SPORTS = [
  {
    title: "Football",
    img: "https://freepngdownload.com/image/thumb/download-football-png.png",
    slug: "football",
  },
  {
    title: "Basketball",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/400px-Basketball_Clipart.svg.png?20210111192439",
    slug: "basketball",
  },
  {
    title: "Cricket",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Cricketball.svg",
    slug: "cricket",
  },
];
const Home = () => {
  const [selected, setSelected] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parent]);

  return (
    <>
      <div>Home</div>
      <Container style={{ padding: 16 }}>
        <ScrollArea
          offsetScrollbars
          sx={{ width: "100%" }}
          styles={(_) => ({
            scrollbar: {
              visibility: "hidden",
            },
          })}
        >
          <Group ref={parentRef} style={{ width: "150%" }}>
            {SPORTS.map((sport, index) => (
              <div onClick={() => setSelected(index)} key={sport.slug}>
                <SportsPill
                  src={sport.img}
                  isSelected={selected === index}
                  title={sport.title}
                />
              </div>
            ))}
          </Group>
        </ScrollArea>
        <CarouselGames />
        <MatchListItem />
        <MatchListItem />
        <MatchListItem />
        <MatchListItem />
        <MatchListItem />
        <MatchListItem />
        <MatchListItem />
        <MatchListItem />
      </Container>
    </>
  );
};

export default Home;
