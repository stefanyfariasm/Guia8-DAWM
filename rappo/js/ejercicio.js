let informacion = {}

let cargarDatos = () => {
  /*petición asincrónica con el objeto fetch al url Escritores*/
  fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    let escritores = xml.getElementsByTagName('escritor')
    
    //recorrer la colección 
    for(let escritor of escritores){
      let id = escritor.querySelector('id').textContent
      let autor = escritor.querySelector('nombre').textContent
      informacion[id] = autor;
  
      let plantilla = `<option value="${id}">${autor.replace(/.$/, '')}</option>`
      document.querySelector('select').innerHTML += plantilla
    }
  })
  .catch(console.error);
}

