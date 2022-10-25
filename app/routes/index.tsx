import { HomeCollaborateSection } from "~/components/Home/HomeCollaborateSection";
import { HomeEdgeCasesSection } from "~/components/Home/HomeEdgeCasesSection";
import { HomeFeatureGridSection } from "~/components/Home/HomeFeatureGridSection";
import { HomeHeader } from "~/components/Home/HomeHeader";
import { HomeHeroSection } from "~/components/Home/HomeHeroSection";
import { HomeInfoBoxSection } from "~/components/Home/HomeInfoBoxSection";
import { HomeSearchSection } from "~/components/Home/HomeSearchSection";
import { HomeFooter } from "~/components/Home/HomeFooter";
import { UrlForm } from "~/components/UrlForm";

import {
  commitSession,
  getSession,
  ToastMessage,
} from "../services/toast.server";
import { json, useLoaderData } from "remix";
import ToastPopover from "../components/UI/ToastPopover";
import { HomeApiHeroBanner } from "~/components/Home/HomeApiHeroBanner";

type LoaderData = { toastMessage?: ToastMessage };

export async function loader({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);
  const toastMessage = session.get("toastMessage") as ToastMessage;

  return json(
    { toastMessage },
    {
      headers: { "Set-Cookie": await commitSession(session) },
    }
  );
}
export default function Index() {
  const { toastMessage } = useLoaderData<LoaderData>();
  return (
    <div style={{ height: '100%' }}>
      <UrlForm />
      {/* {toastMessage && (
        <ToastPopover
          message={toastMessage.message}
          title={toastMessage.title}
          type={toastMessage.type}
          key={toastMessage.id}
        />
      )}

      <HomeHeader fixed={true} />
      <HomeHeroSection />
      <HomeApiHeroBanner />
      <HomeInfoBoxSection />
      <HomeEdgeCasesSection />
      <HomeSearchSection />
      <HomeCollaborateSection />
      <HomeFeatureGridSection />
      <HomeFooter /> */}
    </div>
  );
}
