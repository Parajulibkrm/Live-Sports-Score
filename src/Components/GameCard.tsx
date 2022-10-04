import {
  Badge,
  Center,
  createStyles,
  Group,
  Image,
  Space,
  Text,
} from "@mantine/core";
import React from "react";

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

const GameCard = () => {
  const { classes } = useStyles();
  return (
    <>
      {/* <Text size="sm" className={classes.description}>
              Page views
            </Text> */}
      <Space h={"md"} />
      <Group position="apart">
        <div>
          <Center>
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
              width={80}
            />
          </Center>
          <Center>
            <Text className={classes.description}>Chelsea</Text>
          </Center>
        </div>
        <div>
          <Center>
            <Text className={classes.goals}>12:01</Text>
          </Center>
          <Center>
            <Badge color={"red"}>87'</Badge>
          </Center>
        </div>
        <div>
          <Center>
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
              width={80}
            />
          </Center>
          <Center>
            <Text className={classes.description}>Chelsea</Text>
          </Center>
        </div>
      </Group>
    </>
  );
};

export default GameCard;
