import { AppShell, Aside, Center, Loader, MediaQuery, Text } from "@mantine/core";
import React, { lazy, Suspense } from "react";
// import ExcalidrawApp from "./Excalidraw";
// import Ex from "./Ex";
import NavbarSearch from "./Components/NavBarWithSearch";
import { atom } from "jotai";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
export const open = atom(true);

const Home = lazy(async () => await import("./Pages/Home"));
// const ExcalidrawApp = lazy(async () => await import("./Excalidraw"));
const MainBody = (): JSX.Element => {
  return (
    <Router>
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<NavbarSearch />}
        aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      >
        <Suspense
          fallback={
            <Center>
              <Loader variant="dots" />
            </Center>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<Home />} />
          </Routes>
        </Suspense>
      </AppShell>
    </Router>
  );
};

export default MainBody;