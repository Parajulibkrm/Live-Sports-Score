import {
  Badge,
  Box,
  Card,
  Center,
  Container,
  createStyles,
  Group,
  Image,
  ScrollArea,
  Space,
  Text,
} from "@mantine/core";

import { Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";

import React from "react";
import GameCard from "../Components/GameCard";
import GameHeader from "../Components/GameHeader";
import GameTimeline from "../Components/GameTimeline";

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
  const { classes } = useStyles();
  return (
    <Card
      shadow="sm"
      radius="md"
      style={{ height: "100%", padding: 0, paddingTop: 16, marginLeft: 0 }}
      className={classes.card}
    >
      <Container mb={16}>
        <GameHeader title="Game Title" />
        <GameCard />
        <Group position="apart">
          <Group position="left">
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              <li>Bahadur 58'</li>
              <li>Bahadur 58'</li>
              <li>Bahadur 58'</li>
            </ul>
          </Group>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li>Bahadur 58'</li>
            <li>Bahadur 58'</li>
            <li>Bahadur 58'</li>
          </ul>
        </Group>
      </Container>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        m={0}
        style={{ width: "100%", height: "100%" }}
      >
        <Tabs
          defaultValue="gallery"
          styles={(theme) => ({ tabLabel: { fontSize: theme.fontSizes.sm } })}
        >
          <Tabs.List>
            <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
            <Tabs.Tab value="messages">Messages</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <ScrollArea style={{ height: "50vh" }}>
              <Box style={{ height: "auto" }}>
                <GameTimeline />
              </Box>
            </ScrollArea>
            {/* </Box> */}
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            Messages tab content
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Card>
  );
};

export default Game;
