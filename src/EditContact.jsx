import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";

async function process_form(e){

    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const datos = Object.fromEntries(data.entries());
    try{
    const result = await fetch("http://localhost/directoriotel/contactos.php?opt=update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    if(result.ok){
        alert("Contacto Actualziado correctamente");
        //navigate("/")
    }
} catch (error) {
    console.error(error);
}
}

async function get_one_contact(id){

  try {
    const response = await fetch(`http://localhost/directoriotel/contactos.php?opt=get&id=${id}`)
    const data = await response.json()
    console.log(data)
    return data;
  }
  catch (error) {
    console.error(error)
    return [];
  }

}

function NewContact(){
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const {contactid} = useParams()
    const [conid, setConid] = useState("")

    useEffect(
        ()=>{
            const contact = get_one_contact(contactid).then((result)=>{
                setName(result.name)
                setLastname(result.lastname)
                setPhone(result.phone)
                setConid(result.id)
            });
        },[]
    )

    const handleNameInput = (ev)=>{ setName(ev.target.value)    }
    const handleLastnameInput = (ev)=>{ setLastname(ev.target.value)    }
    const handlePhoneInput = (ev)=>{ setPhone(ev.target.value)    }

    return <>
    <h1>Editar contacto</h1>
    <form onSubmit={(e) => { process_form(e) }}>
        <input type="text" name="contact_id" id="contact_id" value={conid} onChange={setConid}/>
        <label>Nombre</label>
        <input type="text" name="name" id="name" value={name} onChange={handleNameInput}/>
        <label>Apellido</label>
        <input type="text" name="lastname" id="lastname" value={lastname} onChange={handleLastnameInput}/>
        <label>Telefono</label>
        <input type="text" name="phone" id="phone" value={phone} onChange={handlePhoneInput}/>
        <button type="submit">Guardar</button>
    </form>
    </>
}

export default NewContact