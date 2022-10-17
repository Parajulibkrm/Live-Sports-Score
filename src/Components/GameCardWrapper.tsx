import { Badge, Card, Center, createStyles, Group, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { Match } from "../../types";
import GameCard from "./GameCard";

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    backgroundColor: "#9272EA",
  },
  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 2,
  },
  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },
}));

const GameCardWrapper = ({ data }: { data: Match }) => {
  const { classes } = useStyles();
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{ height: "100%" }}
      className={classes.card}
      component={Link}
      to={`/game/${data.key}`}
    >
      <Group position="apart">
        <Group align={"flex-end"}>
          <Text className={classes.title}>{data.title}</Text>
        </Group>
        <Group>
          <Badge>{data.status}</Badge>
        </Group>
      </Group>
      <GameCard data={data} />
      <Center>
        <Text className={classes.description} size="sm">
          {data.tournament?.title}
        </Text>
      </Center>
    </Card>
  );
};

export default GameCardWrapper;
