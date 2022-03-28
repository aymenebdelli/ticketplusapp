import React from 'react'
import logoPartOne from '../assets/t-circle.png'
import logoPartTwo from '../assets/plus.png'

export const Footer = () => {
    return (
        <div className='text-center copy-right mt-20'>
            <img src={logoPartOne} alt='brand' width="3%" />
            <img src={logoPartTwo} alt='brand' width="3%" />
            &copy; Ticket Plus all right reserved -2022
        </div>
    )
}
