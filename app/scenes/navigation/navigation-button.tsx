import { Link, useLocation } from "@remix-run/react";
import { type FC } from "react";
import { Button } from "~/components/ui/button";

type Props = { to: string; name: string };

export const NavigationButton: FC<Props> = ({ to, name }) => {
  const { pathname } = useLocation();

  return (
    <Button
      className="rounded-[10px]"
      variant={to === pathname ? "default" : "ghost"}
      asChild
    >
      <Link to={to}>{name}</Link>
    </Button>
  );
};
