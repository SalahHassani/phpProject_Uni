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
      let html = `      <div class="card" value="${ele}">
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
const form = document.querySelectorAll(".form");
const body = document.querySelectorAll("body");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");
const signIn = document.querySelector(".signIn");
const signUp = document.querySelector(".signUp");
const showCardDetails = document.querySelector(".showCardDetails");

// ......................Functions...................

const openSignInForm = function (e) {
  e.preventDefault();
  closeModal();
  close.classList.remove("hidden");
  signInForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openSignUpForm = function (e) {
  e.preventDefault();
  closeModal();
  close.classList.remove("hidden");
  signUpForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  close.classList.add("hidden");
  signUpForm.classList.add("hidden");
  signInForm.classList.add("hidden");
  overlay.classList.add("hidden");
  showCardDetails.innerHTML = "";
  form.forEach((ele) => ele.reset());
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
// MyEvents("click", document, openSignInForm);
// MyEvents("click", document, openSignUpForm);
MyEvents("keydown", document, closeModalOnEsc);

cardContainer.addEventListener("click", function (e) {
  e.preventDefault();

  let ele = e.target;

  if (!ele.closest(".card")) return;

  while (ele && !ele.classList.contains("card")) {
    ele = ele.parentNode;
  }
  const key = ele.getAttribute("value");

  // console.log(
  //   ele.parentNode.parentNode,
  //   ele.getAttribute("value"),
  //   ele.dataset.value
  // );
  showCardModal(key);
});

// function showCardModal(key) {
//   let cardHtml;
//   fetch("./PokemonData.json")
//     .then((response) => response.json())
//     .then((data) => {
//       // Now 'data' is an array containing the parsed JSON data
//       console.log(data, key);

//       cardHtml = `
//   <div class="pokemonDetails">
//   <div class="pokemonName">
//     <h1><span class="highlight"> ${data[key].name}</span></h1>
//   </div>
//   <div class="details">
//     <div class="pokemonImage col-5 ${data[key].type}">
//       <img
//         src=" ${data[key].image}"
//         alt="no Image Found"
//       />
//     </div>
//     <div class="extraDetails col-7">
//       <div class="description">
//         <h2>Description</h2>
//         <p> ${data[key].description}</p>
//       </div>
//       <div class="type">
//         <h2>Type :</h2>
//         <div>
//           <img src="./images/${data[key].type}.png" alt="" />
//           <h3> ${data[key].type}</h3>
//         </div>
//       </div>
//       <div class="status">
//         <h2>Status</h2>
//         <div>
//           <div class="health col-4">
//             <h3>Health :  ${data[key].hp}</h3>
//             <img src="./images/health.png" alt="no image found" />
//           </div>
//           <div class="defence col-4">
//             <h3>Defence :  ${data[key].defense}</h3>
//             <img src="./images/defance.png" alt="no image found" />
//           </div>
//           <div class="Attack col-4">
//             <h3>Attack :  ${data[key].attack}</h3>
//             <img src="./images/attack.png" alt="no image found" />
//           </div>
//         </div>
//       </div>
//       <div class="price"><h2>Price : </h2>
//         <img src="./images/moneyBag.png" alt="no image found" />
//         <h3> ${data[key].price} USD</h3>
//       </div>
//     </div>
//   </div>
//   <div class="trade">
//     <div id="container">
//       <p id="loginMessage">
//         To explore more details about this card or to make a purchase,
//         please sign in or sign up. We look forward to having you as part of
//         our Pokémon Trade Hub community!
//       </p>
//       <div class="SignInAndSignUp">
//         <a href="#" id="signInLink" class="signIn">Sign In</a>
//         <a href="#" id="signUpLink" class="signUp">Sign Up</a>
//       </div>
//     </div>
//   </div>
// </div>
//   `;

//       showCardDetails.innerHTML = cardHtml;

//       overlay.classList.remove("hidden");
//       close.classList.remove("hidden");
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }

function showCardModal(key) {
  let cardHtml;
  fetch("./PokemonData.json")
    .then((response) => response.json())
    .then((data) => {
      // Now 'data' is an array containing the parsed JSON data
      console.log(data, key);

      cardHtml = `
  <div class="pokemonDetails">
  <div class="pokemonName">
    <h1><span class="highlight"> ${data[key].name}</span></h1>
  </div>
  <div class="details">
    <div class="pokemonImage col-5 ${data[key].type}">
      <img
        src="${data[key].image}"
        alt="no Image Found"
      />
    </div>
    <div class="extraDetails col-7">
      <div class="description">
        <h2>Description</h2>
        <p> ${data[key].description}</p>
      </div>
      <div class="type">
        <h2>Type :</h2>
        <div>
          <img src="./images/${data[key].type}.png" alt="" />
          <h3> ${data[key].type}</h3>
        </div>
      </div>
      <div class="status">
        <h2>Status</h2>
        <div>
          <div class="health col-4">
            <h3>Health :  ${data[key].hp}</h3>
            <img src="./images/health.png" alt="no image found" />
          </div>
          <div class="defence col-4">
            <h3>Defence :  ${data[key].defense}</h3>
            <img src="./images/defance.png" alt="no image found" />
          </div>
          <div class="Attack col-4">
            <h3>Attack :  ${data[key].attack}</h3>
            <img src="./images/attack.png" alt="no image found" />
          </div>
        </div>
      </div>
      <div class="price"><h2>Price : </h2>
        <img src="./images/moneyBag.png" alt="no image found" />
        <h3> ${data[key].price} USD</h3>
      </div>
    </div>
  </div>
  <div class="trade">
  <div class="isAvailable">
    <h1>Trade</h1>
  </div>
  <div id="container2">
    <div class="currentOnwer col-6">
      <div class="nameAndPic">
        <span class="profileIcon col-4">
          <img
            src="${data[key].image}"
            alt=""
          />
        </span>
        <h3 class="col-8">Admin</h3>
      </div>
      <div class="lastBought">
        <span>Bought Date : </span> 20-jan-2022
      </div>
      <div class="lastBoughtPrice">
        <span>Bought Price : </span>160 USD
      </div>
      <div class="lastCardOnwer"><span>Last Owner : </span> None</div>
      <div class="rating"><span>Rating.... </span> 5 Star</div>
    </div>

    <div class="isOpenToTrade col-6">
        <div class="offerTitle">
          <h3>Open To Trade</h3>
        </div>
      
        <div class="handleBtns">
          <div>
            <button class="btn btnIcon">
            Send an Offer <i class="fa-solid fa-percent"></i>
            </button>
        
            <button class="btn btnIcon">
              Send a Request <i class="fa-brands fa-nfc-symbol"></i>
            </button>
        
            <button class="btn btnIcon">
              Ask to Swap Cards <i class="fa-solid fa-retweet"></i>
            </button>
          </div>
        </div>
      </div>

    <!-- <div class="pricingDetails col-4">
      expected price.... trande.... last owner....
    </div> -->
  </div>
</div>
  </div>
</div>
  `;

      showCardDetails.innerHTML = cardHtml;

      overlay.classList.remove("hidden");
      close.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

document.addEventListener("click", function (e) {
  e.preventDefault();

  const ele = e.target;
  if (ele.closest(".signIn")) {
    openSignInForm(e);
    return;
  }

  if (!ele.closest(".signIn")) return;

  openSignUpForm(e);
});
