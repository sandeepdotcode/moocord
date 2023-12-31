import NavSidebar from "@/components/nav/NavSidebar";
import ModalProvider from "@/components/providers/ModalProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(!session) {
    redirect('/login');
  }

  const { 
    data: publicUser,
  } = await supabase.from("users").select().eq("id", session.user.id).single();

  if (publicUser?.username === null) {
    redirect('/sign-up/initial-setup');
  }

  const username = publicUser.display_name || publicUser.username || "My";

  return (
      <div className="h-full">
        <ModalProvider username={username} />
        <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
          <NavSidebar userData={publicUser} />
        </div>
        <div className="md:pl-[72px] h-full">
          { children }
        </div>
      </div>
  )
}

export default MainLayout;
