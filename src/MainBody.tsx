import {
  AppShell,
  Aside,
  Center,
  Loader,
  MediaQuery,
  Stack,
  Text,
} from "@mantine/core";
import React, { lazy, Suspense } from "react";
// import ExcalidrawApp from "./Excalidraw";
// import Ex from "./Ex";
import NavbarSearch from "./Components/NavBarWithSearch";
import { atom } from "jotai";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./Pages/Game";
import FootballPreloader from "./Components/FootballPreloader";
import Pusher from "pusher-js";
import PastGames from "./Components/PastGames";

// import Home from "./Pages/Home";
export const open = atom(true);
export const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
});
const Home = lazy(async () => await import("./Pages/Home"));
const MainBody = (): JSX.Element => {
  return (
    <Router>
      <MediaQuery smallerThan={"sm"} styles={{ paddingLeft: 0 }}>
        <AppShell
          navbarOffsetBreakpoint="sm"
          navbar={<NavbarSearch />}
          aside={
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 300, lg: 400 }}>
                <PastGames />
              </Aside>
            </MediaQuery>
          }
          styles={(theme) => ({
            main: {
              // padding: 0,
              [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                padding: 0,
              },
            },
          })}
          // sx={{ margin: 0, padding: 0 }}
        >
          <Suspense
            fallback={
              <Stack
                justify={"center"}
                align={"center"}
                style={{ height: "100vh" }}
              >
                {/* <Loader variant="dots" /> */}
                <FootballPreloader />
              </Stack>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<Home />} />
              <Route path="/past" element={<PastGames />} />
              <Route path="/game/:id" element={<Game />} />
            </Routes>
          </Suspense>
        </AppShell>
      </MediaQuery>
    </Router>
  );
};

export default MainBody;
