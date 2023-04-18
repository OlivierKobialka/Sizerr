import React from 'react'
import { TbArrowBigUpLines } from "react-icons/tb"

const ScrollTop = () => {
    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    };

    return (
        <button onClick={handleScroll} className='bg-primary rounded-full text-white p-2 fixed bottom-2 right-2'>
            <TbArrowBigUpLines />
        </button>
    )
}

export default ScrollTop