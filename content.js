// content.js
const afterLibButton = document.getElementById('afterlibButton');  // Assurez-vous que l'ID du bouton est correct
const confirmationModal = document.getElementById('confirmationModal');
const closeModal = document.getElementById('closeModal');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

// Vérifier l'heure du dernier clic dans le stockage de l'extension
chrome.storage.local.get(['lastClicked'], (result) => {
  const currentTime = Date.now();
  const lastClickedTime = result.lastClicked || 0;
  const timeoutDuration = 3600 * 1000; // 1 heure en millisecondes

  if (currentTime - lastClickedTime < timeoutDuration) {
    const remainingTime = timeoutDuration - (currentTime - lastClickedTime);
    disableButton(remainingTime);  // Désactiver le bouton pendant la durée restante
  } else {
    enableButton();  // Réactiver le bouton si 1 heure s'est écoulée
  }
});

// Lors du clic sur le bouton, afficher le popup de confirmation
afterLibButton.addEventListener('click', () => {
  // Afficher le popup de confirmation
  confirmationModal.style.display = 'block';
});

// Lors du clic sur le bouton "Oui" dans le popup
yesButton.addEventListener('click', () => {
  const currentTime = Date.now();
  chrome.storage.local.set({ lastClicked: currentTime }, () => {
    disableButton(3600 * 1000); // Désactiver le bouton pendant 1 heure
  });

  // Fermer le popup après confirmation
  confirmationModal.style.display = 'none';
});

// Lors du clic sur le bouton "Non" dans le popup
noButton.addEventListener('click', () => {
  // Fermer simplement le popup sans faire d'action
  confirmationModal.style.display = 'none';
});

// Fermer le popup lorsque l'utilisateur clique sur "X"
closeModal.addEventListener('click', () => {
  confirmationModal.style.display = 'none';
});

// Fonction pour désactiver le bouton et afficher un compte à rebours
function disableButton(remainingTime) {
  afterLibButton.disabled = true;

  let timeLeft = remainingTime;

  // Mettre à jour le texte du bouton avec le temps restant
  const interval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
      afterLibButton.disabled = false;
      afterLibButton.innerText = "AfterLib"; // Réactiver le bouton
    } else {
      timeLeft -= 1000;
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      afterLibButton.innerText = `Attendez ${minutes}m ${seconds}s`; // Mettre à jour le bouton avec le temps restant
    }
  }, 1000);
}

// Fonction pour réactiver le bouton après 1 heure
function enableButton() {
  afterLibButton.disabled = false;
  afterLibButton.innerText = "AfterLib";  // Réinitialiser le texte du bouton
}
