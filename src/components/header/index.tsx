import Image from 'next/image';

export default function Header() {
    return (
        <div className='w-full items-center justify-center flex bg-slate-50 dark:bg-slate-700'>
            <div className='flex w-full justify-between items-center group rounded-lg border border-transparent p-2'>
                <Image src='/JV-main1.PNG' alt='' width={50} height={50} />
                <h1
                    className={`text-2xl font-semibold whitespace-nowrap font-['Verdana']`}>
                    Home Run Verdi
                </h1>
                <Image src='/JV-main2.PNG' alt='' width={50} height={50} />
            </div>
        </div>
    );
}
