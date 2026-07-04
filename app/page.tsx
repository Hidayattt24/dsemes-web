import { redirect } from "next/navigation";
import { ROUTES }   from "@/constants/routes";

/** Root entry point — redirect to login page. */
export default function RootPage() {
  redirect(ROUTES.LOGIN);
}
