import { MapScreen } from "@/features/map/pages/mapScreen";

export function Home() {
  console.log(document.documentElement.outerHTML);
  return (
    <div>
      <MapScreen />
    </div>
  );
}
