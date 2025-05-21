import React from 'react';

const Footer = () => {
    return (
        <footer className='flex justify-evenly bg-gray-800 text-white w-full py-10  bottom-0 fixed'> 
        <div className='flex flex-col  gap-3'>
            <span className='font-bold text-lg'>React.js + Vite Dijkstra Simulator</span>
            <p>This is a very overkill website.</p>
        </div>
        <div className='flex flex-col   gap-3'>
            <span className='font-bold text-lg'>CONTRIBUTORS</span>
                <a href="https://keion.ca" className='text-gray-400 hover:text-white'>Keion Vergara</a>
                <a href="https://github.com/rrtullis" className='text-gray-400 hover:text-white'>Reagan Tullis</a>
                <a href="https://github.com/Thraetaona" className='text-gray-400 hover:text-white'>Fereydoun Memarzanjany</a>
        </div>
        <div className='flex flex-col  gap-3'>
            <span className='font-bold text-lg'>RESOURCES</span>
                <a href="https://math.umd.edu/~immortal/CMSC351/notes/dijkstra.pdf" className='text-gray-400 hover:text-white'>University of Maryland</a>
                <a href="https://www.youtube.com/watch?v=_lHSawdgXpI" className='text-gray-400 hover:text-white'>Video Explanation</a>
                <a href="https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844" className='text-gray-400 hover:text-white'>Textbook</a>
        </div>

        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
    text: {
        margin: 0,
        fontSize: '14px',
    },
};

export default Footer;