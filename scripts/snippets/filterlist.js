
function resetDisplayBlocks() {

    let listas = document.getElementsByClassName('filter-list');

    for (let lista of listas){
        let elementos = lista.getElementsByClassName('filter-block');
        for (let div of elementos){
            div.style.display = "";
        }
    }
}

function setTagFilter(tag){

    let listas = document.getElementsByClassName('filter-list');

    for (let lista of listas){
        let filtroTag = lista.getElementsByClassName('filter-tag');
        if(filtroTag && filtroTag.length){
            filtroTag[0].value = '';
        }
    }
    resetDisplayBlocks();
    for (let lista of listas){
        let filtroTag = lista.getElementsByClassName('filter-tag');
        if(filtroTag && filtroTag.length){
            filtroTag[0].value = tag;
        }
    }
    filterlists();
}

function reverseList(){

    let listas = document.getElementsByClassName('filter-list');

    for (let lista of listas){


        let elementos = [...lista.getElementsByClassName('filter-block')];
        console.log(elementos);

        nodos = [];
        for(e of elementos){
            nodos.push(e);
            lista.removeChild(e);
        }

        lista.append(...nodos.reverse());
    }

}




function filterlists() {

    let listas = document.getElementsByClassName('filter-list');

    for (let lista of listas){

        let filtro = lista.getElementsByClassName('filter-text');
        let filtroTag = lista.getElementsByClassName('filter-tag');

        let elementos = lista.getElementsByClassName('filter-block');
        if (!elementos.length || (!filtro.length && !filtroTag.length )){
            continue;
        }
        filtro = filtro.length ? filtro[0].value.toLowerCase() : '';
        filtroTag = filtroTag.length ? filtroTag[0].value.toLowerCase() : '';

        for (let div of elementos){

            let tags = []
            try { tags = Array.from(div.getElementsByClassName('tags')[0].children).map(o => o.innerText);
            } catch (error) {}

            let tagCoincidence = filtroTag.length > 0;
            if (tagCoincidence){
                tagCoincidence = tags.includes(filtroTag);
            } else {tagCoincidence = true}

            let textCoincidence = false;
            let titulo = div.getElementsByClassName('filter-title');
            if (!titulo || !titulo.length){
                textCoincidence = true;
            }
            titulo = titulo[0];

            let text = titulo.textContent || titulo.innerText;
            textCoincidence = textCoincidence || text.toLowerCase().indexOf(filtro) > -1;

            if (textCoincidence && tagCoincidence){
                div.style.display = "";
            }else{
                div.style.display = "none";
            }

        }


    }

}

/*


  <link rel="stylesheet" href="style/snippets/filterlist.css">
  <script src="scripts/snippets/filterlist.js"></script>

  <div class="filter-list">
    <input type="text" onkeyup="filterlists()" placeholder="Búsqueda">

    <div class="filter-block">
      <h3 class="filter-title">Titulo 1</h3>

      Contenido 1

    </div>

    <div>
      <h3 class="filter-title">Titulo 2</h3>

      Contenido 2

    </div>

    <div>
      <h3 class="filter-title">Titulo 3</h3>

      Contenido 3

    </div>


  </div>

*/
