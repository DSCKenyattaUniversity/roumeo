document.addEventListener("DOMContentLoaded", init, false);

// register service worker
function init() {
  const btnInstall = document.querySelector("#btn-install");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(
      (reg) => {
        console.log("Service worker registered -->", reg);
      },
      (err) => {
        console.error("Service worker not registered -->", err);
      }
    );
  }

  // install
  let defferdPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    defferdPrompt = e;

    btnInstall.style.display = "block";
  });

  btnInstall.addEventListener("click", (e) => {
    defferdPrompt.prompt();
    defferdPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("user accepted the A2Hs prompt");
      }

      defferdPrompt = null;
    });
  });
}
