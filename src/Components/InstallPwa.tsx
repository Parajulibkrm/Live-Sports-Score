import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    transitionend: BeforeInstallPromptEvent;
  }
}

const InstallPWA = ({
  children,
  className,
}: {
  children: JSX.Element[];
  className: string;
}): JSX.Element | null => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent): void => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    if (promptInstall == null) {
      return;
    }
    promptInstall.prompt().catch((e) => {
      console.log(e);
    });
  };

  if (!supportsPWA) {
    return null;
  }
  return (
    <a href="#" onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default InstallPWA;