import ProtectedRoute from "@/app/components/ProtectedRoute"; 

import MemberHomepage from "./Memberhomepage";

export default function page() {
  return (
    <ProtectedRoute>
      <MemberHomepage />
    </ProtectedRoute>
  );
}
