import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

function TimeAndLocation({weather:{dt,timezone,name,country}}) {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className=' text-white text-xl font-extralight'>
                {formatToLocalTime(dt,timezone)}
               Tuesday,23/ Jul 2024 | 10:00 AM
            </p>
        </div>
        <div className='flex items-center justify-center my-3'> 
            <p className='text-white text-3xl font-medium'>
                {`${name},${country}`}
                Hanoi, VN

            </p>
        </div>
    </div>

  )
}

export default TimeAndLocation