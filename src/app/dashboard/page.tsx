import { fetchTests } from "./actions";
import DashboardPage from "./DashboardPage";
import AuthGuard from "../guards/AuthGuard";

export default async function Page() {
  const tests = await fetchTests();

  return (
    <AuthGuard>
      <DashboardPage tests={tests} />
    </AuthGuard>
  );
}
