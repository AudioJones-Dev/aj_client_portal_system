import { redirect } from "next/navigation";

/** Portal root → Home. (Auth gate / marketing splash slots in here later.) */
export default function RootPage() {
  redirect("/home");
}
