function main() {
  console.log('entered')
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

  const recognition = new SpeechRecognition();
  const icon = document.querySelector('.fa')
  let paragraph = document.createElement('p');
  let container = document.querySelector('.speech-section');
  container.appendChild(paragraph);
  
  icon.addEventListener('click', () => {
    dictate();
  });

  const dictate = () => {
    recognition.start();
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      
      paragraph.textContent = speechToText;
    }
  }

}

window.addEventListener('load', main);