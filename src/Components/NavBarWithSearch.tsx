import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Image,
  Text,
  ActionIcon,
  useMantineColorScheme,
  TextInput,
  Code,
  Badge,
} from "@mantine/core";
import {
  IconSettings,
  IconDatabaseImport,
  IconSwitchHorizontal,
  IconLogout,
  IconArrowAutofitLeft,
  IconSun,
  IconMoonStars,
  IconSearch,
  IconArtboard,
  IconSquarePlus,
  IconTag,
} from "@tabler/icons";
import { useAtom } from "jotai";
import { open } from "../MainBody";
// import InstallPWA from "./Components/InstallPwa";
import { openSpotlight } from "@mantine/spotlight";
import { useNavigate } from "react-router-dom";
import autoAnimate from "@formkit/auto-animate";
// import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
    searchCode: {
      fontWeight: 700,
      fontSize: 10,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2]
      }`,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "/list", label: "Home", icon: IconArtboard, comingSoon: false },
  {
    link: "/past",
    label: "Past Games",
    icon: IconSquarePlus,
    comingSoon: false,
  },
  // { link: "#", label: "Settings", icon: IconSettings, comingSoon: true },
  // {
  //   link: "#",
  //   label: "Collections",
  //   icon: IconDatabaseImport,
  //   comingSoon: true,
  // },
  // { link: "#", label: "Tags", icon: IconTag, comingSoon: true },
];

const InstallPWA = lazy(async () => await import("./InstallPwa"));
export function NavbarSimple(): JSX.Element {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const [opened, setOpened] = useAtom(open);
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parent]);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(`${item.link}`);
      }}
    >
      <Group position="apart">
        <Group>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Group>
        {item.comingSoon ? <Badge color={"red"}>soon</Badge> : <></>}
      </Group>
    </a>
  ));

  return (
    <Navbar
      ref={parentRef}
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      style={{ marginRight: 0, height: "100%" }}
      // height="auto"
      width={
        opened ? { sm: 200, lg: 300, md: 250 } : { sm: 50, lg: 50, md: 50 }
      }
    >
      {opened ? (
        <>
          <Navbar.Section grow>
            <Group position="right">
              <ActionIcon
                variant="outline"
                onClick={() => setOpened((b) => !b)}
              >
                <IconArrowAutofitLeft size={18} />
              </ActionIcon>
            </Group>
            <Image
              className={classes.header}
              src={dark ? "./dark.png" : "./light.png"}
            />
            <Group position="apart">
              <Group>
                <Text size={"lg"} style={{ paddingLeft: 15 }}>
                  Skore
                </Text>
              </Group>
              <Group>
                <ActionIcon
                  variant="outline"
                  color={dark ? "yellow" : "blue"}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
              </Group>
            </Group>
            <br />
            <TextInput
              placeholder="Search"
              size="md"
              icon={<IconSearch size={12} stroke={1.5} />}
              rightSectionWidth={70}
              rightSection={
                <Code className={classes.searchCode}>Ctrl + P</Code>
              }
              styles={{ rightSection: { pointerEvents: "none" } }}
              mb="sm"
              autoComplete="off"
              aria-autocomplete="both"
              aria-haspopup="false"
              onClick={() => openSpotlight()}
              onChange={() => openSpotlight()}
            />
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            {/* <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </a> */}

            <Suspense>
              <InstallPWA className={classes.link}>
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Install App</span>
              </InstallPWA>
            </Suspense>
          </Navbar.Section>
        </>
      ) : (
        <ActionIcon variant="outline" onClick={() => setOpened((b) => !b)}>
          <IconArrowAutofitLeft size={18} />
        </ActionIcon>
      )}
    </Navbar>
  );
}

export default NavbarSimple;
