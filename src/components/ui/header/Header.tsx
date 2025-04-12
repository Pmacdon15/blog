export default function Header() {
    return (
      <div className="flex flex-col mt-4 justify-center items-center w-full">
        <h1 className="text-6xl border p-4 w-5/6 md:w-3/6 text-center rounded-sm">{process.env.NEXT_PUBLIC_OWNER_NAME}&apos;s Blogs</h1>
      </div>
    );
  }