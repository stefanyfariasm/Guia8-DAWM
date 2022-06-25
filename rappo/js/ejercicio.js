/*istener al evento DOMContentLoaded del document.*/
window.addEventListener('DOMContentLoaded', (event) => {
  cargarDatos();
});

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

/* Evento Change */

/* Agregue el listener al evento change de la etiqueta <select> */
let selectElement = document.querySelector('select');

selectElement.addEventListener('change', (event) => {
  let id_escritor = event.target.value; 
  let frases_por_escritor= [];
  let frases_html = ' ';
  
  /*petición asincrónica con el objeto fetch al url Frases*/
  fetch("https://dataserverdaw.herokuapp.com/escritores/frases").then(response => response.json()).then(data => {
      
      /*Recorra el arreglo json*/
      for(let element in data['frases']){
        let id_autor = data['frases'][element]['id_autor']
        
        if (id_escritor == id_autor){
          frases_por_escritor.push(data['frases'][element]['texto'])
        }       
      }

      for(let unicaF of frases_por_escritor){
        frases_html += 
        `<div class="col-lg-3">
          <div class="test-inner">
            <div class="test-author-thumb d-flex">
              <div class="test-author-info">
                <h4>${informacion[id_escritor].replace(/.$/, '')}</h4>                                            
              </div>
            </div>
          <span>${unicaF}"</span>
          <i class="fa fa-quote-right"></i>
          </div>
        </div>`
      }
      document.querySelector('#frases').innerHTML = frases_html
    }).catch(console.error);
})

