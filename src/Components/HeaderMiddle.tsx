import { useEffect } from "react";
import {
  createStyles,
  Group,
  ActionIcon,
  Burger,
  Image,
  useMantineColorScheme,
  Card,
} from "@mantine/core";
import {
  IconSearch,
  IconBrandGithub,
  IconSun,
  IconMoonStars,
} from "@tabler/icons";
import { openSpotlight } from "@mantine/spotlight";
import { open } from "../MainBody";
import { useAtom } from "jotai";
const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    marginBottom: 10,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export function HeaderMiddle(): JSX.Element {
  const [opened, setOpened] = useAtom(open);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { classes } = useStyles();

  useEffect(() => {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage
        .estimate()
        .then((estimate) => {
          console.log(
            `Using ${estimate?.usage ?? "na"} out of ${
              estimate?.quota ?? "na"
            } bytes.`
          );
        })
        .catch(console.log);
    }
  }, []);
  return (
    <Group
      className={classes.inner}
      mb={120}
      style={{ margin: 0 }}
      position="apart"
    >
      <Group className={classes.links}>
        <a
          href={"/"}
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Home
        </a>
      </Group>
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        size="sm"
        className={classes.burger}
      />

      <Image
        src={dark ? "Draww-dark-cover.png" : "Draww-cover.png"}
        style={{ maxHeight: 50, maxWidth: 100 }}
      />

      <Group spacing={4} className={classes.social} position="right" noWrap>
        <ActionIcon size="lg" onClick={() => openSpotlight()}>
          <IconSearch size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon size="lg">
          <IconBrandGithub size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? (
            <IconSun size={18} stroke={1.5} />
          ) : (
            <IconMoonStars size={18} stroke={1.5} />
          )}
        </ActionIcon>
        {/* <Avatar src={"Test"} radius="xl" color={"blue"}>
          BP
        </Avatar> */}
      </Group>
    </Group>
  );
}

export default HeaderMiddle;
