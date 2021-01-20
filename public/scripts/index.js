import { post, getLetters, getLettersIwrite } from "/scripts/api.js";

const dot = document.querySelector(".button-dot");
const createDialogBtn = document.querySelector("#create-dialog-btn");
const searchDialogBtn = document.querySelector("#search-dialog-btn");
const sendLetterForm = document.querySelector("#send-letter-form");
const searchLetterForm = document.querySelector("#search-letter-form");
const register = document.querySelector("#register");
const registerWindow = document.querySelector("#register-section");
const registerInput = document.querySelector("#register-input");
const writwLetter = document.querySelector("#write-letter");
const textArea = document.querySelector("#text-area");
const date = document.querySelector("#date");
const before = document.querySelector("#before");
const next = document.querySelector("#next");
const registerBtn = document.querySelector('#register input[type="submit"]');
const unregister = document.querySelector("#register-section button");
const myLetters = document.querySelector("#my-letters");
const myLettersInput = document.querySelector("#my-letters button");
const to = document.querySelector("#to");
const toInput = document.querySelector("#to form");
const toRomeo = document.querySelector('#to form input[type="text"]');
const secret = document.querySelector("#secret-input");

window.addEventListener("DOMContentLoaded", () => {
  // toggle view letters
  let viewSentLetter = false;

  // session user hundler
  if (sessionStorage.getItem(localStorage.from)) {
    registerWindow.style.display = "none";
  }

  // authenticate user
  if (localStorage.from && localStorage.secret) {
    registerInput.value = localStorage.from;
    registerInput.style.display = "none";
    registerBtn.value = "open";
    register.addEventListener("submit", (e) => {
      e.preventDefault();
      if (localStorage.secret !== secret.value) {
        window.alert("sorry romeo cant let you in !!");
      } else {
        sessionStorage.setItem(localStorage.from, "true");
        registerWindow.style.display = "none";
      }
    });
  } else {
    register.addEventListener("submit", () => {
      localStorage.from = registerInput.value;
      localStorage.secret = secret.value;
    });
  }

  // get all my letters
  function getAll() {
    viewSentLetter = false;
    return getLetters().then((letters) => {
      renderLetters(letters);
    });
  }
  getAll();

  // view leters the client writes
  myLettersInput.addEventListener("click", () => {
    if (viewSentLetter === false) {
      getLettersIwrite().then((letters) => {
        renderLetters(letters);
      });
      viewSentLetter = true;
    } else {
      getAll();
    }
  });
  unregister.addEventListener("click", () => {
    localStorage.removeItem("from");
    location.reload();
  });
});

function renderLetters(letters) {
  let last = 0;
  let count = 0;
  console.log(letters);
  if (letters.length !== 0) {
    last = letters.length - 1;
    count = last;
    textArea.innerHTML = letters[last].letter;
    date.innerHTML = new Date(letters[last].timeStamp).toLocaleDateString(
      "en-us"
    );

    next.addEventListener("click", () => {
      console.log(last);
      console.log(count);
      if (last === count) {
      } else {
        count += 1;
        textArea.innerHTML = letters[count].letter;
        date.innerHTML = new Date(letters[count].timeStamp).toLocaleDateString(
          "en-us"
        );
      }
    });
    before.addEventListener("click", () => {
      if (count === 0) {
      } else {
        count -= 1;
        textArea.innerHTML = letters[count].letter;
        date.innerHTML = new Date(letters[count].timeStamp).toLocaleDateString(
          "en-us"
        );
      }
    });
  } else {
    textArea.innerHTML = "fetching letters ...";
    date.innerHTML = "00/00/00";
  }
}

// navigation iconst hundler
dot.addEventListener("click", () => {
  if (sendLetterForm.className !== "toggle-display") {
    sendLetterForm.className = "toggle-display";
    textArea.style.opacity = "1";
    date.style.opacity = "1";
  } else if (searchLetterForm.className !== "toggle-display") {
    searchLetterForm.className = "toggle-display";
  } else if (createDialogBtn.className === "toggle-display") {
    createDialogBtn.classList.remove("toggle-display");
    searchDialogBtn.classList.remove("toggle-display");
    myLetters.classList.remove("toggle-display");
    before.classList.remove("toggle-display");
    next.classList.remove("toggle-display");
  } else {
    myLetters.className = "toggle-display";
    next.className = "toggle-display";
    before.className = "toggle-display";
    createDialogBtn.className = "toggle-display";
    searchDialogBtn.className = "toggle-display";
  }
});

// write letter btn hundle
createDialogBtn.addEventListener("click", () => {
  if (to.className === "toggle-display") {
    to.classList.remove("toggle-display");
    textArea.style.opacity = "0.1";
    date.style.opacity = "0.01";
    createDialogBtn.className = "toggle-display";
    searchDialogBtn.className = "toggle-display";
    myLetters.className = "toggle-display";
    before.className = "toggle-display";
    next.className = "toggle-display";

    toInput.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.romeo = toRomeo.value;
      console.log(toRomeo.value);
      to.className = "toggle-display";
      sendLetterForm.classList.remove("toggle-display");
    });
  } else {
    to.className = "toggle-display";
  }
});

// search lettr input
searchDialogBtn.addEventListener("click", () => {
  if (searchLetterForm.className === "toggle-display") {
    searchLetterForm.classList.remove("toggle-display");
    createDialogBtn.className = "toggle-display";
    searchDialogBtn.className = "toggle-display";
    before.className = "toggle-display";
    next.className = "toggle-display";
    myLetters.className = "toggle-display";
  } else {
    searchLetterForm.className = "toggle-display";
  }
});

// send letter functio
sendLetterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let send = {
    letter: writwLetter.value,
    timeStamp: new Date(),
    from: localStorage.from,
    to: localStorage.romeo,
    secret: localStorage.secret,
  };
  if (navigator.onLine) {
    const confirmation = confirm(`send to ${localStorage.romeo} ?`);
    if (confirmation === true) {
      post("/send", send);
      writwLetter.value = "";
      sendLetterForm.className = "toggle-display";
      textArea.style.opacity = "1";
      date.style.opacity = "1";
      location.reload();
    }
  } else {
    window.alert("you are offline cant reach romeo/juliet");
  }
});

// // catch API requests
//   if (navigator.onLine) {
//     (async function cacheRequests() {
//       await caches.open("CACHE-7").then(function (cache) {
//         return cache.addAll([
//           `/letters/${localStorage.from}`,
//           `/mypen/${localStorage.secret}`,
//         ]);
//       });
//     })();
//   }
