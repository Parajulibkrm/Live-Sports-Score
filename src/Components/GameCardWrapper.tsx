import { Badge, Card, Center, createStyles, Group, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
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

const GameCardWrapper = () => {
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
      to="/game"
    >
      <Group position="apart">
        <Group align={"flex-end"}>
          <Text className={classes.title}>Hello World</Text>
        </Group>
        <Group>
          <Badge>live</Badge>
        </Group>
      </Group>
      <GameCard />
      <Center>
        <Text className={classes.description} size="sm">
          Description
        </Text>
      </Center>
    </Card>
  );
};

export default GameCardWrapper;
