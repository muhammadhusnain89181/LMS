import React from 'react'
import { string } from 'prop-types'

const propTypes = { role: string }

const EmptyEmbed = ({ role }) => (
  <svg
    className='embed-responsive-item'
    width='100%'
    height='225'
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMidYMid slice'
    focusable='false'
    role='img'
    aria-label='Placeholder: Thumbnail'
  >
    <title>No stream</title>
    <rect width='100%' height='100%' fill='#55595c'/>
    <text x='37%' y='54%' fill='#eceeef' dy='.3em' fontSize='1.5em' fontFamily='Roboto'>
      Oops, nothing to display...
    </text>
    <text x='40.1%' y='60%' fill='#eceeef' dy='.3em' fontSize='1.5em' fontFamily='Roboto'>
      Stream is inactive
    </text>
    <svg
      width='100%'
      height='50px'
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='sad-tear'
      className='svg-inline--fa fa-sad-tear fa-w-16'
      role='img' xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 496 512'
      y='40%'
      x='-1%'
    >
      <path
        fill='#eceeef'
        d='M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM152 416c-26.5 0-48-21-48-47 0-20 28.5-60.4 41.6-77.8 3.2-4.3 9.6-4.3 12.8 0C171.5 308.6 200 349 200 369c0 26-21.5 47-48 47zm16-176c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm170.2 154.2C315.8 367.4 282.9 352 248 352c-21.2 0-21.2-32 0-32 44.4 0 86.3 19.6 114.7 53.8 13.8 16.4-11.2 36.5-24.5 20.4z'>
      </path>
    </svg>
  </svg>
)

EmptyEmbed.propTypes = propTypes

export default EmptyEmbed
