import { Avatar, Badge, Text, Transition } from "@mantine/core";
import React from "react";

const scaleY = {
  in: { transform: "scaleX(1)" },
  out: { transform: "scaleX(0)" },
  common: { transformOrigin: "left" },
  transitionProperty: "transform, opacity",
};

const Logo = ({
  src,
  isSelected,
  title,
}: {
  src: string;
  isSelected: boolean;
  title: string;
}) => <Avatar alt={title} size={isSelected ? 40 : 34} radius="xl" src={src} />;
const LeaguePill = ({
  src,
  isSelected,
  title,
}: {
  src: string;
  isSelected: boolean;
  title: string;
}) => {
  return (
    <Badge
      sx={{
        paddingLeft: isSelected ? 0 : 4,
        paddingRight: isSelected ? 8 : 0,
        paddingTop: isSelected ? 0 : 4,
        paddingBottom: isSelected ? 0 : 4,
        textTransform: "none",
        fontWeight: 400,
        height: 40,
        fontSize: 20,
        marginRight: 10,
      }}
      size="xl"
      radius="xl"
      color={isSelected ? "grape" : "gray"}
      variant={isSelected ? "outline" : "light"}
      leftSection={<Logo src={src} title={title} isSelected={isSelected} />}
    >
      <Transition
        mounted={isSelected}
        transition={scaleY}
        duration={200}
        timingFunction="ease-in-out"
        exitDuration={200}
      >
        {(styles) => <div style={styles}>{title}</div>}
      </Transition>
    </Badge>
  );
};

export default LeaguePill;
