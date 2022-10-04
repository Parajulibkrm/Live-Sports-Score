import { ActionIcon, Burger, createStyles, Group, Text } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { open } from "../MainBody";
const useStyles = createStyles((theme) => ({
  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },
}));
const GameHeader = ({ title }: { title: string }) => {
  const [opened, setOpened] = useAtom(open);
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Group position="apart">
      <ActionIcon variant="transparent" onClick={() => navigate(-1)}>
        <IconChevronsLeft />
      </ActionIcon>
      <Text className={classes.title}>{title}</Text>
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        size="sm"
        className={classes.burger}
      />
    </Group>
  );
};

export default GameHeader;
