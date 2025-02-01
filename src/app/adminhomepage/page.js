
import Adminhomepage from "./Adminhomepage";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <Adminhomepage />
    </ProtectedRoute>
  );
}
