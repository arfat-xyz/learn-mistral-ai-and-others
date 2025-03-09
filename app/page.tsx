import HomeClientComponent from "@/components/home/home-client-component";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-data-hook";

export const metadata = metaDataGeneratorForNormalPage("Home");
export default function Home() {
  return <HomeClientComponent />;
}
