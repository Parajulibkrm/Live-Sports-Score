import {
  ThemeIcon,
  Text,
  Avatar,
  Timeline,
  Paper,
  Card,
  Group,
  Divider,
  Box,
  ScrollArea,
} from "@mantine/core";
import { IconBallFootball } from "@tabler/icons";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Event } from "../../types";
import { pusher } from "../MainBody";
import { getIconData } from "../utils/icons";

function GameTimeline({
  id,
  setLiveCount,
  reset
}: {
  id: string | undefined;
  setLiveCount: (arg: number) => void;
  reset: boolean,
}) {
  const [events, setEvents] = useState<Event[]>([]);
  if (!id) return null;
  const fetchEventsFromBackend = useCallback(async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/match/${id}`
    );
    setEvents(res.data?.events);
  }, []);
  const viewport = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // subscribe to live events for the match
    const channel = pusher.subscribe(`cache-${id}`);
    // when new event occurs, add it to events and scroll to buttom.
    channel.bind("events", (newEvent: Event) => {
      setEvents((events) => [...events, newEvent]);
      viewport.current &&
        viewport.current.scrollTo({
          top: viewport.current.scrollHeight,
          behavior: "smooth",
        });
    });
    // handle cache miss and fetch match events from backend
    channel.bind("pusher:cache_miss", fetchEventsFromBackend);
    // bind subscription count to LiveCount state
    channel.bind("pusher:subscription_count", (data: any) => {
      setLiveCount(data.subscription_count);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  useEffect(()=> {
    setEvents([])
  },[reset])
  return (
    <ScrollArea viewportRef={viewport}>
      <Box style={{ height: "auto" }}>
        <div style={{ width: "100%", margin: "auto", maxWidth: "90%" }}>
          <Divider
            my="xs"
            label="Load all events"
            labelPosition="center"
            variant="dotted"
            labelProps={{
              component: "p",
              href: "#",
              onClick: fetchEventsFromBackend,
              variant: "link",
              color: "blue",
            }}
          />
          <Timeline>
            {events.map((event) => {
              const bulletData = getIconData(event?.type);
              return (
                <Timeline.Item
                  key={event.timeStamp}
                  bullet={
                    <ThemeIcon
                      variant="gradient"
                      gradient={bulletData.color}
                      radius="xl"
                    >
                      <Text style={{ fontFamily: "fontball" }}>
                        {bulletData.icon}
                      </Text>
                    </ThemeIcon>
                  }
                  bulletSize={24}
                >
                  <Card p={0} m={0}>
                    <Group position="apart" spacing="xl" noWrap>
                      <Group position="left">
                        <div>
                          <Text size="lg">{`${event.matchTimeStamp}" ${bulletData.title}`}</Text>
                          <Text color="dimmed" size="sm">
                            {event.comment}
                          </Text>
                        </div>
                      </Group>
                      <Group position="right" grow>
                        <Avatar.Group spacing="sm">
                          {(event.player1 || event.team1) && (
                            <Avatar
                              src={
                                (event.player1 &&
                                  `${import.meta.env.VITE_BACKEND_URL}/player/${
                                    event.player1
                                  }/photo`) ||
                                (event.team1 &&
                                  `${import.meta.env.VITE_BACKEND_URL}/team/${
                                    event.team1
                                  }/photo`)
                              }
                              radius="xl"
                            />
                          )}
                          {(event.player2 ||
                            event.team2 ||
                            (event.player1 && event.team1)) && (
                            <Avatar
                              src={
                                (event.player2 &&
                                  `${import.meta.env.VITE_BACKEND_URL}/player/${
                                    event.player2
                                  }/photo`) ||
                                (event.team2 &&
                                  `${import.meta.env.VITE_BACKEND_URL}/team/${
                                    event.team2
                                  }/photo`) ||
                                (event.team1 &&
                                  `${import.meta.env.VITE_BACKEND_URL}/team/${
                                    event.team1
                                  }/photo`)
                              }
                              radius="xl"
                            />
                          )}
                        </Avatar.Group>
                      </Group>
                    </Group>
                  </Card>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>
      </Box>
    </ScrollArea>
  );
}
export default GameTimeline;
