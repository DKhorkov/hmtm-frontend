import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-12 flex gap-6">
      <Link href="/login">
        <Button>Login Page</Button>
      </Link>
      <Link href="/register">
        <Button>Sign up Page</Button>
      </Link>
    </div>
  );
}
