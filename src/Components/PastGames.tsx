import { Center, Container, ScrollArea, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Match } from "../../types";
import MatchListItem from "./MatchListItem";

const PastGames = () => {
  const { data: matches } = useQuery<{ items: Match[]; count: number }>(
    ["matches"],
    async () =>
      await (
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/match`)
      ).data
  );
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: 0,
      }}
    >
      <Center>
        <Text>Past Games</Text>
      </Center>
      <ScrollArea sx={{ flexGrow: 1 }}>
        {matches?.items
          .filter((item) => item.status === "ENDED")
          .map((match) => (
            <MatchListItem key={match.key} data={match} min />
          ))}
      </ScrollArea>
    </Container>
  );
};

export default PastGames;
