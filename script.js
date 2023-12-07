"use strict";

const cardContainer = document.querySelector(".cardContainer");

cardContainer.addEventListener("mouseover", function (e) {
  e.preventDefault();
  const ele = e.target;
  if (!ele.closest(".card")) return;
});

fetch("./PokemonData.json")
  .then((response) => response.json())
  .then((data) => {
    // Process the data
    // console.log(data);
    for (let ele in data) {
      //   console.log(ele);
      let newCard = document.createElement("div");
      let html = `      <div class="card">
      <div class="cardRow pokemonCardImage ${data[ele].type}">
        <img
          src="${data[ele].image}"
          alt="no image found"
        />
      </div>
      <div class="cardRow pokemoneCardData">
        <div class="pokemoneName"><h3>${data[ele].name}</h3></div>
        <div class="pokemoneType">
          <div class="discription hidden">
            <p>${data[ele].description}</p>
          </div>
          <img src="./images/${data[ele].type}.png" alt="no image found" /> ${data[ele].type}
        </div>
        <div class="pokemoneStatus">
          <div><img src="./images/health.png" alt="no image found" /> ${data[ele].hp}</div>
          <div>
            <img src="./images/defance.png" alt="no image found" /> ${data[ele].defense}
          </div>
          <div><img src="./images/attack.png" alt="no image found" /> ${data[ele].attack}</div>
        </div>
      </div>
      <div class="cardRow pokemoneCardPrice">
        <p><img src="./images/moneyBag.png" alt="no image found" /> ${data[ele].price}</p>
      </div>
    </div>`;

      cardContainer.innerHTML += html;
    }
  })
  .catch((error) => console.error("Error reading JSON file:", error));

/**********************************************************/
/**********************************************************/
/**********************************************************/

const signInForm = document.querySelector(".signInForm");
const signUpForm = document.querySelector(".signUpForm");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");
const signIn = document.querySelector(".signIn");
const signUp = document.querySelector(".signUp");

// ......................Functions...................

const openSignInForm = function (e) {
  e.preventDefault();
  close.classList.remove("hidden");
  signInForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openSignUpForm = function (e) {
  e.preventDefault();
  close.classList.remove("hidden");
  signUpForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  close.classList.add("hidden");
  signUpForm.classList.add("hidden");
  signInForm.classList.add("hidden");
  overlay.classList.add("hidden");
};

const closeModalOnEsc = function (e) {
  if (e.key === "Escape" && !close.classList.contains("hidden")) {
    closeModal();
  }
};

const MyEvents = function (onWhat, element, method) {
  element.addEventListener(onWhat, method);
};

MyEvents("click", close, closeModal);
MyEvents("click", overlay, closeModal);
MyEvents("click", signIn, openSignInForm);
MyEvents("click", signUp, openSignUpForm);
MyEvents("keydown", document, closeModalOnEsc);
