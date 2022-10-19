import {
  Center,
  createStyles,
  Group,
  Image,
  MediaQuery,
  Text,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Match } from "../../types";
const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    // display: "flex",
    // alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },
  visible: {
    visibility: "hidden",
  },
}));

const truncate = (input: string) =>
  input.length > 25 ? `${input.substring(0, 20)}...` : input;

const MatchListItem = ({
  data,
  min = false,
}: {
  data: Match;
  min?: boolean;
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.item} onClick={() => navigate(`/game/${data.key}`)}>
      <Group position="apart">
        <div>
          <Group position="left">
            <Center>
              <Image
                src={data.teams[0].logo}
                width={35}
                height={35}
                fit={"contain"}
              />
            </Center>
            {!min && (
              <MediaQuery
                smallerThan={"sm"}
                styles={{ visibility: "hidden", height: 0, width: 0 }}
              >
                <Text>{data.teams[0].name}</Text>
              </MediaQuery>
            )}
          </Group>
          {/* <MediaQuery
            largerThan={"sm"}
            styles={{ visibility: "hidden", height: 0, width: 0 }}
          >
            <Text>Chel</Text>
          </MediaQuery> */}
        </div>
        <MediaQuery smallerThan={"sm"} styles={{ fontSize: 13 }}>
          <div style={{ fontSize: min ? 13 : 16 }}>
            <Center>
              <Text>{truncate(data.title)}</Text>
            </Center>
            <Group position="center">
              <IconCalendar size={20} />{" "}
              <Text>{new Date(data.time).toLocaleString()}</Text>
            </Group>
          </div>
        </MediaQuery>
        <div>
          <Group position="right">
            {!min && (
              <MediaQuery
                smallerThan={"sm"}
                styles={{ visibility: "hidden", height: 0, width: 0 }}
              >
                <Text>{data.teams[1].name}</Text>
              </MediaQuery>
            )}
            <Center>
              <Image
                src={data.teams[1].logo}
                width={35}
                height={35}
                fit={"contain"}
              />
            </Center>
          </Group>
          {/* <MediaQuery
            largerThan={"sm"}
            styles={{ visibility: "hidden", height: 0, width: 0 }}
          >
            <Text>Chel</Text>
          </MediaQuery> */}
        </div>
      </Group>
    </div>
  );
};

export default MatchListItem;
