import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Router, Routes } from 'react-router-dom'
import NewContact from './NewContact.jsx'
import EditContact from './EditContact.jsx'

async function get_contacts(){

  try {
    const response = await fetch('http://localhost/directoriotel/contactos.php?opt=all')
    const data = await response.json()
    console.log(data)
    return data;
  }
  catch (error) {
    console.error(error)
    return [];
  }

}

async function eliminar_contacto(id){
  alert("eliminar contacto con id: " + id)
  try {
    const response = await fetch(`http://localhost/directoriotel/contactos.php?opt=delete&id=${id}`)
    const data = await response.json()
    console.log(data)
    return data;
  }
  catch (error) {
    console.error(error)
    return [];
  }

}

function Inicio(){
  const [contactos, setContactos] = useState([])

  useEffect(() => {
    get_contacts().then((data) => {
      setContactos(data)
    })
  }, [])

  return <>
  <h1>Lista de contactos</h1>
  <table border={1}>
    <thead>
      <tr>
      <th>Nombre</th>
      <th>Telefono</th>
      <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
  {contactos.map((contacto) => (
     <tr key={contacto.id}>
      <td>{contacto.name+ " " + contacto.lastname}</td>
      <td>{contacto.phone}</td>
      <td>
        <button><Link to={`/edit/${contacto.id}`}>Editar</Link></button>
        <button onClick={() => eliminar_contacto(contacto.id).then(() => {
          get_contacts().then((data) => setContactos(data))
        })}>Eliminar</button>
      </td>
    </tr>
  ))}
  </tbody>
  </table>
  </>

}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/new">Nuevo contacto</Link>
    </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/new" element={<NewContact />} />
        <Route path="/edit/:contactid" element={<EditContact />} />
      </Routes>
      
    </>
  )
}

export default App
