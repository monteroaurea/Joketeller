const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button

function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "365b4358b8ca4786b053e9baa156b3fc",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  //fetch joke from JokeAPI
  const apiUrl = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //Process fetched data and format the joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Call tellMe to convert text to speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    // Catch error here
    console.log("whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes); //initiate the process of fetching and telling a joke
audioElement.addEventListener("ended", toggleButton); // re-enabling the button after the text-to-speech finishes playing.

// In summary, when the button is clicked, the code fetches a joke from the JokeAPI, converts it into speech using the VoiceRSS API, plays the speech, and disables the button during this process. The button is re-enabled when the text-to-speech finishes playing.
