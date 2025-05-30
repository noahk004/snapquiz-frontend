import { fetchTests } from "./actions";
import DashboardPage from "./DashboardPage";
import AuthGuard from "@/components/guards/AuthGuard";

async function DashboardComponent() {
  const tests = await fetchTests();

  return <DashboardPage tests={tests} />;
}

export default function Page() {
  return (
    <AuthGuard>
      <DashboardComponent />
    </AuthGuard>
  );
}
