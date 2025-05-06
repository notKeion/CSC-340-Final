import React from 'react';

const GraphControls = () => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-lg flex flex-col items-center'>
            <h2 className='text-2xl font-bold mb-4'>Graph Controls</h2>
            {/* Add your controls here */}
            <div className='flex gap-4'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add Vertex</button>
                <button className='bg-green-500 text-white px-4 py-2 rounded'>Add Edge</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded'>Remove Vertex</button>
                <button className='bg-yellow-500 text-white px-4 py-2 rounded'>Remove Edge</button>
                <button className='bg-purple-500 text-white px-4 py-2 rounded'>Run Algorithm</button>   
            </div>
        </div>
    );
};

export default GraphControls;