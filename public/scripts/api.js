function get(url) {
  return fetch(url).then(onSuccess, onError);
}

// post
function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}

// get letters
function getLetters() {
  return get(`/letters/${localStorage.from}`);
}

// getLetters from letters
function getLettersIwrite() {
  return get(`/mypen/${localStorage.secret}`);
}
export { post, getLetters, getLettersIwrite };
