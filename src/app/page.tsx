import UrlInput from "./components/UrlInput";
import { headers } from "next/headers";

// const inter = Inter({ subsets: ["latin"] });
export default function Page() {
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  // console.log("isMounted", isMounted);
  // const origin =
  //   typeof window !== "undefined" && window.location.origin
  //     ? window.location.origin
  //     : "";
  // console.log("origin", origin);

  const headersList = headers();

  const origin = headersList.get("host");
  return (
    <div className="p-2 xl:mt-10 w-full">
      <div className="text-center">
        <h1 className="font-bold my-2 text-xl">Mint Frames</h1>
        <p className="text-sm text-gray-300">
          Mint directly from your farcaster feed with a mint frame. Currently
          works with Zora contracts.
        </p>
      </div>
      <div className="w-full my-4 xl:my-8">
        <UrlInput baseUrl={origin} />
      </div>
    </div>
  );
}
