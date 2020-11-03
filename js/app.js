window.onload = function () {
  /*
<div id="films">
      <div class="film">
        <img src="images/Intouchables.jpg" alt="intouchables">
        <h3>Test Titre</h3>

      </div>
    </div>

  fonction qui prend en parametre un nombre 
  et affiche dans le catalogue le film associé
  à ce nombre
  */

  for (i = 0; i < filmData.length; i++) {
    createFilm(i);
  }

  function createFilm(number) {
    var someFilm = filmData[number];
    /*creation d'un film*/
    var film = document.createElement("div");
    film.className = "film";
    film.id = number + "-film";

    /*creation de l'image*/
    var image = document.createElement("img");
    image.src = someFilm.image;
    image.alt = someFilm.title;

    /*creation du titre du film*/
    var titre = document.createElement("h3");
    titre.innerHTML = someFilm.title;

    film.appendChild(image);
    film.appendChild(titre);

    /*recupere la place dans le html */
    document.getElementById("films").appendChild(film);
  }

  /*on recupere l'imput */
  var input = document.getElementsByTagName("input");
  /*on ajout un evenement   */
  input[0].addEventListener("keyup", recherche);

  //checkbox
  input[1].addEventListener("mouseup", checkbox);

  //afficher la descrition de chaque film

  //ciblé les films qui sont dans le catalogue

  var films = document.getElementById("films");
  films.addEventListener("mouseover", survolFilm);

  // quand on sort de la surface du film
  films.addEventListener("mouseout", finSurvol);

  //ajouter le film au top 2

  films.addEventListener("click", selectionFilm);

  var selection = document.getElementById ("selection");
  selection.addEventListener("click", clickSelection);





  //fonctions +++++++++++++++++++++++++++++++++++++++++

  function recherche(event) {
    var inputValue =
      event.target.value; /**recupere la valeur qui a dans l'input */
    inputValue = inputValue.toLowerCase();

    //verifier la valeur dans la data

    //input n'est pas vide
    for (i = 0; i < filmData.length; i++) {
      var titre = filmData[i].title; //recupere le titre qui est à la position i
      titre = titre.toLowerCase();
      //recuperer l'imput i - film
      var film = document.getElementById(i + "-film");
      //verifier si cela est contenu
      if (titre.includes(inputValue) == false) {
        //ne pas associé le film associé
        film.style.display = "none";
      } else {
        //si c'est inclu il faut le render visible
        film.style.display = "inline-block";
      }
    }
  } //fin fonction recherche

  // fonction checkbox pour afficher les details
  function checkbox(event) {
    var details = document.getElementById("details");
    if (event.target.checked) {
      details.style.display = "none";
    } else {
      details.style.display = "inline-block";
    }
  }

  // fonction au survol d'un film

  function survolFilm(event) {
    //creer une variable qui recupere l'élement survolé
    var elementSurvolee = event.target.parentNode; //permet d'acceder au parents de lélement selectionné
    var identifiantFilm = elementSurvolee.id; //recupere l'id de l'element survol&é
    var position;
    if (identifiantFilm == "catalogue") {
      return;
    } else if (identifiantFilm.length == 6) {
      position = identifiantFilm[0];
    } else if (identifiantFilm.length == 7) {
      position = identifiantFilm[0] + identifiantFilm[1];
    } else {
      return;
    }

    var descriptionFilm = filmData[position].text;
    document.getElementById("details").innerHTML = descriptionFilm;
    //console.log(description);
  }
  //fin fonction survole film

  //fonction fin survole

  function finSurvol(event) {
    document.getElementById("details").innerHTML = "";
  }

  //fonction top 2

  function selectionFilm(event) {
    var film = event.target.parentNode;
    var select1 = document.getElementById("selection1");
    var select2 = document.getElementById("selection2");
    film.addEventListener("mouseover", survolFilm);
    film.addEventListener("mouseout", finSurvol);

    var select1Child = select1.childNodes; // recupere tout les noueds enfants = span
    var select2Child = select2.childNodes; // recupere tout les noueds enfants

    if (select1Child.length == 1) {
      //partie selection1 vide
      select1.insertBefore(film, select1Child[0]);
    } else if (select2Child.length == 1) {
      //partie selection2 est vide
      select2.insertBefore(film, select2Child[0]);
    } else {
      alert("Désolé, vous avez déjà choisi deux films");
    }

    //console.log(select1Child);
  }

  //fonction déselection dans top 2 les filsm retourne dans le catalogue

  function clickSelection (event) {
    var elementClick = event.target;
    var film = elementClick.parentNode;

    var select = film.parentNode;
    var selectChild = select.childNodes;

    if (selectChild[0].className == "film") {
      var copyFilm = selectChild[0];
      select.removeChild(copyFilm);
      document.getElementById("films").appendChild(copyFilm);

    }



    //console.log(selectChild);
  }



};
