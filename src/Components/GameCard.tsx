import {
  Badge,
  Center,
  createStyles,
  Group,
  Image,
  Space,
  Text,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

import { Goal, Match } from "../../types";
import { pusher } from "../MainBody";

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    backgroundColor: "#9272EA",
  },
  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },
  goals: {
    color: theme.white,
    fontWeight: 700,
    fontSize: theme.fontSizes.xl,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 2,
  },
}));

interface GameState {
  goals: Goal[];
  updated: Number;
  status: string;
}
const GameCard = ({
  data,
  setGoals,
}: {
  data: Match;
  setGoals?: (goals: any[]) => void;
}) => {
  const { classes } = useStyles();
  const [gameState, setGameState] = useState<GameState>();

  const goals = useMemo(() => {
    const goalList = gameState?.goals.reduce(function (r, a) {
      r[a.team] = r[a.team] || [];
      r[a.team].push(a);
      setGoals && setGoals(r);
      return r;
    }, Object.create(null));

    return goalList;
  }, [gameState]);

  useEffect(() => {
    // subscribe to state for latest goals and match status update
    const channel = pusher.subscribe(`cache-state-${data.key}`);
    channel.bind("state", (newMessage: GameState) => {
      setGameState(newMessage);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  // console.log({ data });

  return (
    <>
      <Space h={"md"} />
      <Group position="apart">
        <div>
          <Center>
            <Image
              src={data.teams[0].logo}
              width={80}
              height={80}
              fit={"contain"}
            />
          </Center>
          <Center>
            <Text className={classes.description}>{data.teams[0].name}</Text>
          </Center>
        </div>
        <div>
          <Center>
            <Text className={classes.goals}>
              {`${goals?.[`${data.teams[0].key}`]?.length || 0}:${
                goals?.[`${data.teams[1].key}`]?.length || 0
              }`}
            </Text>
          </Center>
          <Center>
            <Badge color={"red"}>{`${gameState?.updated || "-"}`}</Badge>
          </Center>
        </div>
        <div>
          <Center>
            <Image
              src={data.teams[1].logo}
              width={80}
              height={80}
              fit={"contain"}
            />
          </Center>
          <Center>
            <Text className={classes.description}>{data.teams[1].name}</Text>
          </Center>
        </div>
      </Group>
    </>
  );
};

export default GameCard;
