import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Divider,
  Group,
  Image,
  Indicator,
  ScrollArea,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";

import { Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconAt,
  IconMapPin,
  IconClock,
} from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Goal, Match } from "../../types";
import FootballPreloader from "../Components/FootballPreloader";
import GameCard from "../Components/GameCard";
import GameHeader from "../Components/GameHeader";
import GameTimeline from "../Components/GameTimeline";
import startSimulation from "../utils/simulation";
// import MatchAbout from "../Components/MatchAbout";

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    backgroundColor: "#9272EA",
    height: "100%",
  },
  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },
  player: {
    color: theme.white,
    fontWeight: 400,
    fontSize: 13,
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

const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { isLoading, data: match } = useQuery<Match>(
    [`match-${id}`],
    async () =>
      await (
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/match/${id}`)
      ).data
  );
  if (id === undefined) navigate("/");
  const [liveCount, setLiveCount] = useState(0);
  const [goals, setGoals] = useState<any[]>([]);
  const [reset, setReset] = useState(true);

  if (isLoading || !match) return <FootballPreloader />;
  return (
    <Card
      shadow="sm"
      radius="md"
      style={{
        height: "100vh",
        padding: 0,
        paddingTop: 16,
        marginLeft: 0,
        display: "flex",
        flexDirection: "column",
      }}
      className={classes.card}
    >
      <div>
        <Container mb={16}>
          <GameHeader title={match.title} />
          <GameCard data={match} setGoals={setGoals} />
          <Group position="apart">
            <Group position="left">
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {/* @ts-ignore */}
                {goals?.[`${match?.teams[0]?.key}`]?.map((goal) => {
                  // console.log(goal);
                  return (
                    <li className={classes.player}>
                      {goal?.player?.name} {goal.matchTimeStamp}"
                    </li>
                  );
                })}
              </ul>
            </Group>
            <Space h="md" />
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {/* @ts-ignore */}
              {goals?.[`${match.teams[1].key}`]?.map((goal) => {
                // console.log(goal);
                return (
                  <li className={classes.player}>
                    {goal?.player?.name} {goal.matchTimeStamp}"
                  </li>
                );
              })}
            </ul>
          </Group>
          <Group position="right" pt={16}>
            <Indicator
              inline
              dot
              processing
              color={"green"}
              position={"middle-start"}
              offset={-10}
              zIndex={2}
            >
              <Text color={"white"} size="sm">
                {liveCount} Watching Live
              </Text>
            </Indicator>
          </Group>
        </Container>
      </div>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        m={0}
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          defaultValue="live"
          style={{ flexGrow: 1, height: "0px" }}
          styles={(theme) => ({
            tabLabel: { fontSize: theme.fontSizes.sm },
            root: {
              flexGrow: 1,
              height: "0px",
              display: "flex",
              flexDirection: "column",
            },
            panel: { display: "flex", flexDirection: "column" },
          })}
        >
          <Tabs.List>
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="live">Live Commentary</Tabs.Tab>
            {match.key === "test" && (
              <Tabs.Tab value="simulate">Simulate</Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel
            value="live"
            pt="xs"
            style={{ flexGrow: 1, height: "0px" }}
          >
            <GameTimeline
              id={id}
              setLiveCount={(num: number) => setLiveCount(num)}
              reset={reset}
            />
            {/* </Box> */}
          </Tabs.Panel>

          <Tabs.Panel value="about" pt="xs">
            <Text size={"xl"} m={5}>
              {match.title}
            </Text>
            <Badge size="sm" sx={{ width: 100 }}>
              {match.status}
            </Badge>
            <Text size={"md"} m={5}>
              {match.desc}
            </Text>

            <Space h={5} />
            <Stack>
              <Group>
                <ThemeIcon size={40} radius="md" color={"blue"}>
                  <IconMapPin size={24} />
                </ThemeIcon>
                <div>
                  <Text size={"sm"}>Venue</Text>
                  <Text>{match.venue}</Text>
                </div>
              </Group>
              <Group>
                <ThemeIcon size={40} radius="md" color={"blue"}>
                  <IconClock size={24} />
                </ThemeIcon>
                <div>
                  <Text size={"sm"}>Date Time</Text>
                  <Text>{new Date(match.time).toLocaleString()}</Text>
                </div>
              </Group>
            </Stack>
          </Tabs.Panel>

          {match.key === "test" && (
            <Tabs.Panel value="simulate" pt="xs">
              <Button
                onClick={() => {
                  setGoals([]);
                  startSimulation();
                  setReset((r) => !r);
                }}
              >
                Start Simulation
              </Button>
            </Tabs.Panel>
          )}
        </Tabs>
      </Card>
    </Card>
  );
};

export default Game;
