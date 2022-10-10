import {
  Avatar,
  Badge,
  Box,
  Divider,
  Group,
  ScrollArea,
  Space,
  Text,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import TournamentPill from "../Components/TournamentPill";
import autoAnimate from "@formkit/auto-animate";
import CarouselGames from "../Components/CarouselGames";
import MatchListItem from "../Components/MatchListItem";
import HeaderMiddle from "../Components/HeaderMiddle";
import { useQuery } from "@tanstack/react-query";
import { Tournament } from "../../types";
const Home = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const parentRef = useRef(null);
  const {
    isLoading,
    error,
    data: tournaments,
  } = useQuery(["leagues"], () =>
    fetch("http://localhost:5000/tournament").then((res) => res.json())
  );

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parent]);

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: 0,
          display: "flex",
          flexDirection: "column",
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: 8,
          },
          height: "100vh",
          marginBottom: 15,
        })}
      >
        <HeaderMiddle />
        <Space h={10} />
        <div>
          <ScrollArea
            offsetScrollbars
            sx={{ width: "100%" }}
            styles={(_) => ({
              scrollbar: {
                visibility: "hidden",
              },
            })}
          >
            <Group
              ref={parentRef}
              style={{ overflowX: "scroll", display: "table" }}
            >
              <div
                onClick={() => setSelected(null)}
                style={{ display: "table-cell", marginRight: 7 }}
              >
                <TournamentPill
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg"
                  }
                  isSelected={selected === null}
                  title={`All`}
                />
              </div>

              {tournaments &&
                tournaments.items.map((tournament: Tournament) => (
                  <div
                    onClick={() => setSelected(tournament?.key || "")}
                    key={tournament.key}
                    style={{ display: "table-cell" }}
                  >
                    <TournamentPill
                      src={tournament.logo}
                      isSelected={selected === tournament.key}
                      title={tournament.title}
                    />
                  </div>
                ))}
            </Group>
          </ScrollArea>
        </div>
        <Divider my={10} label="Live Matches" />
        <div>
          <CarouselGames />
        </div>
        <Divider my={10} label="Upcoming Matches" />
        <ScrollArea sx={{ flexGrow: 1 }}>
          <MatchListItem />
          <MatchListItem />
          <MatchListItem />
          <MatchListItem />
          <MatchListItem />
          <MatchListItem />
          <MatchListItem />
          <MatchListItem />
        </ScrollArea>
        {/* <Text>Test</Text> */}
      </Box>
    </>
  );
};

export default Home;
