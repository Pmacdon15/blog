import { redirect } from 'next/navigation'
export default async function Home() {

  redirect('/blog/1')
  return (
    <div className=" min-h-screen flex font-[family-name:var(--font-geist-sans)]">


    </div>
  );
};
