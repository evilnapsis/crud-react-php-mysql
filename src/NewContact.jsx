

async function process_form(e){

    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const datos = Object.fromEntries(data.entries());
    try{
    const result = await fetch("http://localhost/directoriotel/contactos.php?opt=new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    if(result.ok){
        alert("Contacto creado correctamente");
        //navigate("/")
    }
} catch (error) {
    console.error(error);
}
}

function NewContact(){
    return <>
    <h1>Nuevo contacto</h1>
    <form onSubmit={(e) => { process_form(e) }}>
        <label>Nombre</label>
        <input type="text" name="name" />
        <label>Apellido</label>
        <input type="text" name="lastname" />
        <label>Telefono</label>
        <input type="text" name="phone" />
        <button type="submit">Guardar</button>
    </form>
    </>
}

export default NewContact