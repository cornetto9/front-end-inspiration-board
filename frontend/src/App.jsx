import { useState } from 'react'
import './App.css'
import Card from './components/Card'

const CARDS = [
  {
    id: 1,
    message: 'Mow the lawn',
    likes: false,
    is_deleted: false,
    board_id: 1,
  },
  {
    id: 2,
    message: 'Cook Pasta',
    likes: true,
    is_deleted: false,
    board_id: 1,
  },
];

function App() {

  return (
    <>
      <Card cardData={CARDS}></Card>
    </>
  )
}

export default App
