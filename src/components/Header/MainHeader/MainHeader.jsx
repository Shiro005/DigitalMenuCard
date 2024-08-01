import React from 'react';
import LocationOn from '@mui/icons-material/LocationOn';

const MainHeader = () => {
    const imageURL = "url(https://th.bing.com/th/id/OIP.ysOLarlEJyeGTwgBTl4-DAAAAA?w=474&h=265&rs=1&pid=ImgDetMain)";
    return (
        <>
            <div className='w-full px-2 py-2 bg-center bg-cover bg-no-repeat bg-slate-900'>
                <div className='bg-slate-900 bg-opacity-35 p-2 rounded-md flex items-center'>
                    <div className='animate-location-icon'>
                        <LocationOn className='h-8 w-8' />
                    </div>
                    <div className='ml-2 font-bold text-white'>
                        <h2 className='text-xl'>NightHub <span className='text-blue-400'>CAFE</span></h2>
                        <h2 className='text-slate-200'>Kaulkhed, Akola</h2>
                    </div>
                </div>
                <div className='bg-green-300'></div>
            </div>
            <style jsx>{`
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                @keyframes jump {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                @keyframes colorChange {
                    0% { color: red; }
                    14% { color: orange; }
                    28% { color: yellow; }
                    42% { color: green; }
                    56% { color: blue; }
                    70% { color: indigo; }
                    84% { color: violet; }
                    100% { color: red; }
                }
                .animate-location-icon {
                    animation: rotate 1s linear infinite, jump 1s ease-in-out infinite, colorChange 7s linear infinite;
                }
            `}</style>
        </>
    );
}

export default MainHeader;
