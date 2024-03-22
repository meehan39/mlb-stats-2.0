import Image from 'next/image';

export default function Header() {
    return (
        <div className='w-full items-center justify-center flex'>
            <a
                href='/'
                className='flex w-full justify-around items-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-700 hover:bg-slate-800/30'>
                <Image src='/JV-main1.PNG' alt='' width={50} height={50} />
                <h1 className={`text-2xl font-semibold whitespace-nowrap`}>
                    Home Run Verdi
                </h1>
                <Image src='/JV-main2.PNG' alt='' width={50} height={50} />
            </a>
        </div>
    );
}
