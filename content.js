// content.js
const afterLibButton = document.getElementById('afterlibButton');  // Assurez-vous que l'ID du bouton est correct
const confirmationModal = document.getElementById('confirmationModal');
const closeModal = document.getElementById('closeModal');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

// Lors du clic sur le bouton "AfterLib", afficher le popup de confirmation
afterLibButton.addEventListener('click', () => {
  // Afficher le popup de confirmation
  confirmationModal.style.display = 'block'; // Afficher le popup
  afterLibButton.disabled = true;  // Désactiver le bouton "AfterLib" pendant l'attente de la réponse
});

// Lors du clic sur le bouton "Oui" dans le popup
yesButton.addEventListener('click', () => {
  const currentTime = Date.now();
  chrome.storage.local.set({ lastClicked: currentTime }, () => {
    disableButton(3600 * 1000); // Désactiver le bouton pendant 1 heure
  });

  // Fermer le popup après confirmation
  confirmationModal.style.display = 'none';
  afterLibButton.disabled = false;  // Réactiver le bouton "AfterLib"
});

// Lors du clic sur le bouton "Non" dans le popup
noButton.addEventListener('click', () => {
  // Fermer le popup simplement sans faire d'action
  confirmationModal.style.display = 'none';
  afterLibButton.disabled = false;  // Réactiver le bouton "AfterLib"
});

// Fermer le popup lorsque l'utilisateur clique sur "X"
closeModal.addEventListener('click', () => {
  confirmationModal.style.display = 'none';
  afterLibButton.disabled = false;  // Réactiver le bouton "AfterLib"
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

