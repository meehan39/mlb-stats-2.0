import Image from "next/image";

export default function Header() {
    return (
        <div className="z-10 w-full items-center justify-center flex">
          <Image src="/JV-main1.png" alt="" width={50} height={50} />
          <a
              href="/"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-3xl font-semibold whitespace-nowrap`}>Home Run Verdi</h2>
          </a>
          <Image src="/JV-main2.png" alt="" width={50} height={50}/>
      </div>
    )
}