import Arrow from '../three/arrow'
import PixelTransition from '../blocks/Animations/PixelTransition/PixelTransition'

export default function Home() {
    return (
        <>
            <div className='fixed inset-x-0 mx-auto w-1/3 top-4 z-20 px-6 bg-slate-50 rounded shadow-[5px_5px_0_#333333] inset-shadow-[-5px_-5px_0_#CCCCCC]'>
                <nav className='flex items-center justify-between pb-5 pt-4'>
                    <div className='w-28 h-auto'>
                        <img src='/pixels.png' alt='pixels logo' loading='lazy' />
                    </div>
                    <a href="#_" className='btn-3d bg-primer-green rounded-none font-display text-xs p-3'>get started</a>
                </nav>
            </div>

            <div className='mt-44 mx-auto w-3/4'>
                <div className='h-fit grid grid-cols-5 bg-slate-50 rounded rounded-b-lg shadow-[0px_8px_0_#333333] inset-shadow-[0px_-5px_0_#CCCCCC]'>
                    <div className='grid-background col-span-3 px-16 pb-16 pt-28 flex flex-col items-start'>
                        <span className='font-subhero text-3xl mb-2 text-slate-500'>welcome to</span>
                        <h1 className='font-hero text-8xl font-bold mb-4 leading-tight'>
                            <b className='text-sekunder-blue'>P</b>
                            <b className='text-sekunder-red'>I</b>
                            <b className='text-sekunder-yellow'>X</b>
                            <b className='text-sekunder-blue'>E</b>
                            <b className='text-sekunder-green'>L</b>
                            <b className='text-sekunder-red'>S</b>
                            <b className='block text-5xl text-slate-900'>CHALLENGE</b>
                        </h1>
                        <span className='font-subhero text-3xl'>
                            <b className='text-sekunder-blue'> P</b>erfecting
                            <b className='text-sekunder-red'> I</b>nterfaces for
                            e<b className='text-sekunder-yellow'>X</b>cellent
                            <b className='text-sekunder-blue'> E</b>xperience and
                            <b className='text-sekunder-green'> L</b>asting
                            <b className='text-sekunder-red'> S</b>olution
                        </span>
                        <a href="#_" className='btn-3d bg-primer-green rounded-none font-display text-xs px-5 py-4 mt-12 mb-20'>get started</a>
                    </div>

                    <div className='col-span-2 bg-sekunder-blue rounded-r'>
                        <Arrow />
                    </div>
                </div>
            </div>

            <div className='mt-36 mx-auto w-3/4'>
                <PixelTransition
                    className='w-full h-[34rem] overflow-hidden rounded-xl bg-transparent'
                    gridSize={10}
                    pixelColor='#fff'
                    animationStepDuration={0.3}
                    firstContent={
                        <div
                            className='grid place-items-center w-full h-full'
                        >
                            <p className='font-hero text-center text-9xl font-bold'>comming soon!</p>
                        </div>
                    }
                    secondContent={
                        <img
                            src="/pixels.png"
                            className='object-contain w-full h-full p-8'
                        />
                    }
                />
            </div>

            <div className='mt-48 flex flex-col items-center mx-auto w-full bg-black rounded-t-4xl pt-20'>
                <p className='font-hero font-extrabold text-white text-[10rem] leading-none'>PIXELS</p>
            </div>
        </>
    )
}
