import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "mhespenh.com | About" }];
};

export default function About() {
  return <div>Coming soon...</div>;
}
