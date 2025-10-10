import { useContext } from "react";
import { LevelContext } from "../utils/LevelContext";

export default function Section({
  isFancy,
  children,
}: {
  isFancy?: boolean;
  children: React.ReactNode;
}) {
  const level = useContext(LevelContext);
  return (
    <section className={"section " + (isFancy ? "fancy" : "")}>
      <LevelContext value={level + 1}>{children}</LevelContext>
    </section>
  );
}
