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
      marginRight: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderMiddle(): JSX.Element {
  const [opened, setOpened] = useAtom(open);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { classes } = useStyles();

  // useEffect(() => {
  //   if ("storage" in navigator && "estimate" in navigator.storage) {
  //     navigator.storage
  //       .estimate()
  //       .then((estimate) => {
  //         console.log(
  //           `Using ${estimate?.usage ?? "na"} out of ${
  //             estimate?.quota ?? "na"
  //           } bytes.`
  //         );
  //       })
  //       .catch(console.log);
  //   }
  // }, []);
  return (
    <Group
      className={classes.inner}
      mb={120}
      style={{ margin: 0 }}
      position="apart"
    >
      <Group spacing={4} className={classes.social} position="left">
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
        <ActionIcon size="lg">
          <IconBrandGithub size={18} stroke={1.5} />
        </ActionIcon>

        <ActionIcon size="lg" onClick={() => openSpotlight()}>
          <IconSearch size={18} stroke={1.5} />
        </ActionIcon>
        {/* <Avatar src={"Test"} radius="xl" color={"blue"}>
          BP
        </Avatar> */}
      </Group>
      <Image
        src={dark ? "Dark.png" : "light.png"}
        style={{ maxHeight: 50, maxWidth: 100 }}
      />

      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        size="sm"
        className={classes.burger}
      />
    </Group>
  );
}

export default HeaderMiddle;
