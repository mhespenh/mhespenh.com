import { Link, useLocation } from "@remix-run/react";
import { type FC } from "react";
import { Button } from "~/components/ui/button";

type Props = { to: string; name: string };

export const NavigationButton: FC<Props> = ({ to, name }) => {
  const { pathname } = useLocation();
  const [, root] = pathname.split("/");

  return (
    <Button
      className="rounded-[10px]"
      variant={`/${root}` === to ? "default" : "ghost"}
      asChild
    >
      <Link to={to}>{name}</Link>
    </Button>
  );
};
