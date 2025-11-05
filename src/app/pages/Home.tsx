import { MapScreen } from "@/features/library/pages/mapScreen";

export function Home() {
  console.log(document.documentElement.outerHTML);
  return (
    <div>
      <MapScreen />
    </div>
  );
}
