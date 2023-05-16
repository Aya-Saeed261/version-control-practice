window.addEventListener("load", async () => {
  if (navigator.serviceWorker) {
    console.log("service worker supported");
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("sw registered");
      })
      .catch((error) => {
        console.log("sw couldn't be registered " + error);
      });
  } else {
    console.log("service worker not supported");
  }
});
