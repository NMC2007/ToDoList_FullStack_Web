import React from 'react'

const Header = () => {
  return (
    <div className='space-y-2 text-center'>
      <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500'>
        My To-Do List
      </h1>
      <p className='text-muted-foreground'>Organize your tasks and boost your productivity!</p>
    </div>
  )
}

export default Header