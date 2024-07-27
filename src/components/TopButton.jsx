import React from 'react'

function TopButton(setQuery) {

    const cities =[
        {
             id:1,
             title:'London'
        },
        {
            id:2,
            title:"HaNoi"
       },
       {
            id:3,
            title:"Tokyo"
        },
        {
             id:4,
             title:"Paris"
        },
        {
            id:5,
            title:"Seoul"       
       },
    ];

    
    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city) => (
                <button key={city.id} className='text-white
                 text-lg font-medium' onclick={() => setQuery({q:city.title})}>
                    {city.title}
                </button>
            ))}
        </div>
    )
    
  
}

export default TopButton;