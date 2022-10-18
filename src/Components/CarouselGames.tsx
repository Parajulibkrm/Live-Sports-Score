import { Carousel, Embla } from "@mantine/carousel";
import {
  Badge,
  Card,
  Center,
  createStyles,
  Group,
  Image,
  Progress,
  Space,
  Text,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { Match } from "../../types";
import GameCard from "./GameCard";
import GameCardWrapper from "./GameCardWrapper";

const useStyles = createStyles((theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
  card: {
    backgroundColor: "#9272EA",
  },

  stats: {
    color: theme.white,
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

function CarouselGames({ data }: { data: Match[] }) {
  const { classes } = useStyles();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla]);

  return data.length ? (
    <>
      <Carousel
        getEmblaApi={setEmbla}
        height={200}
        slideSize="45%"
        slideGap="md"
        align="start"
        slidesToScroll={2}
        breakpoints={[
          { maxWidth: "xl", slideSize: "80%" },
          { maxWidth: "lg", slideSize: "90%" },
          { maxWidth: "md", slideSize: "90%" },
          { maxWidth: "sm", slideSize: "90%", slideGap: 10 },
        ]}
        dragFree
        classNames={classes}
        controlsOffset="xs"
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
        }}
      >
        {data?.map((item) => (
          <Carousel.Slide key={item.key}>
            <GameCardWrapper data={item} />
          </Carousel.Slide>
        ))}

        {/* ...other slides */}
      </Carousel>
      <Progress
        value={scrollProgress}
        styles={{ bar: { transitionDuration: "0ms" }, root: { maxWidth: 320 } }}
        size="sm"
        mt="xl"
        mx="auto"
      />
    </>
  ) : (
    <Text>No Live Matches Available</Text>
  );
}
export default CarouselGames;
