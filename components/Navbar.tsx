import { auth, signOut, signIn } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import { siteInfo } from "../app/siteConfig";
import { BadgePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = async () => {
  const session = await auth();


  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <div className='flex items-center justify-center gap-2'>
            <Image src={siteInfo.logoImgB} alt="Cultural Dragon Logo" width={40} height={40} />
            <Image src={siteInfo.nameImg} alt="Cultural Dragon Name" width={220} height={40} />
          </div>
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href="/item/create">
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form action={async() => {
                "use server";
                await signOut({ redirectTo: "/"});
                }}>
                <button className="hover:cursor-pointer" type="submit">Logout</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                {/* <span>{session?.user?.name}</span> */}
                <Avatar className="size-8">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form action={async() => {
              "use server";
              await signIn('github');
              }}>
              <button className="hover:cursor-pointer" type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
};

export default Navbar