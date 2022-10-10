import "./App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  createEmotionCache,
  ColorScheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { SpotlightProvider } from "@mantine/spotlight";

// import { IconSun, IconMoonStars } from "@tabler/icons";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import Dashboard from "./MainBody";
import { IconSearch } from "@tabler/icons";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App: React.FC = () => {
  const myCache = createEmotionCache({ key: "skore" });
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "skore-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));
  //  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        emotionCache={myCache}
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme, fontFamily: "Poppins" }}
      >
        <ModalsProvider>
          <NotificationsProvider>
            <SpotlightProvider
              shortcut={["mod + P"]}
              actions={[]}
              searchIcon={<IconSearch size={18} />}
              searchPlaceholder="Search Anything..."
              nothingFoundMessage="Nothing found..."
            >
              <QueryClientProvider client={queryClient}>
                <Dashboard />
              </QueryClientProvider>
              {/* </ActionIcon> */}
            </SpotlightProvider>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
