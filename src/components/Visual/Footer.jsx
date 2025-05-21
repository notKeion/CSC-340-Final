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
            <span className='font-bold text-lg'>ABOUT</span>
                <a href="#" className='text-gray-400 hover:text-white'>Privacy Policy</a>
                <a href="#" className='text-gray-400 hover:text-white'>Terms of Service</a>
                <a href="#" className='text-gray-400 hover:text-white'>Contact Us</a>
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