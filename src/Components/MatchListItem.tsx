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

const MatchListItem = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.item}>
      <Group position="apart">
        <div>
          <Group position="left">
            <Center>
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
                width={35}
              />
            </Center>
            {/* <MediaQuery
              smallerThan={"sm"}
              styles={{ visibility: "hidden", height: 0, width: 0 }}
            >
              <Text>Chel</Text>
            </MediaQuery> */}
          </Group>
          {/* <MediaQuery
            largerThan={"sm"}
            styles={{ visibility: "hidden", height: 0, width: 0 }}
          >
            <Text>Chel</Text>
          </MediaQuery> */}
        </div>
        <MediaQuery smallerThan={"sm"} styles={{ fontSize: 13 }}>
          <div>
            <Center>
              <Text>Match Title A little Long Title</Text>
            </Center>
            <Group position="center">
              <IconCalendar size={20} /> <Text>Chelsea</Text>
            </Group>
          </div>
        </MediaQuery>
        <div>
          <Group position="right">
            <Center>
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
                width={35}
              />
            </Center>
            {/* <MediaQuery
              smallerThan={"sm"}
              styles={{ visibility: "hidden", height: 0, width: 0 }}
            >
              <Text>Chel</Text>
            </MediaQuery> */}
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
