   // JavaScript for handling the custom dropdown
   const customDropdowns = document.querySelectorAll('.custom-dropdown');
   customDropdowns.forEach(customDropdown => {
       const selectedOption = customDropdown.querySelector('.selected-option');
       const optionsContainer = customDropdown.querySelector('.options-container');
       const optionBackgrounds = customDropdown.querySelectorAll('.Option-background');

       // Show options container on click
       customDropdown.addEventListener('click', () => {
           optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
       });

       //  option selection and close the dropdown
       optionBackgrounds.forEach(option => {
           option.addEventListener('click', () => {
               selectedOption.textContent = option.textContent;
               optionsContainer.style.display = 'none';
             
               customDropdown.dispatchEvent(new Event('click'));
           });
       });

       // Hide options container when clicking outside
       document.addEventListener('click', (event) => {
           if (!customDropdown.contains(event.target)) {
               optionsContainer.style.display = 'none';
           }
       });
   });

   
   
   
   function selectOption(option) {
    const selectedOption = document.getElementById('selected-option');
    selectedOption.textContent = option + '  \u2193';

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.style.display = 'none';

    if (option === 'Reject') {
        afterAccpectopenModal("modalOpen");
    }
}


function afterAccpectopenModal(modalName) {
    // const inputReason = document.getElementById('inputReason').value;
    // console.log('Rejected with reason:', inputReason);
    const modal = document.getElementById(modalName);
     modal.style.display = 'block';
    modal.classList.add('show');
   
}

function rejectAndCloseModal(modalName) {
   
    // const inputReason = document.getElementById('inputReason').value;
    // console.log('Rejected with reason:', inputReason);
    const modal = document.getElementById(modalName);
     modal.style.display = 'none';
    modal.classList.remove('show');
    if(modalName !="actionModal"&& modalName !="rejectModal"){  
        afterAccpectopenModal("rejectModal")
}

}


function accpectAndCloseModal(modalName) {
    console.log(modalName)
    // const inputReason = document.getElementById('inputReason').value;
    // console.log('Rejected with reason:', inputReason);
    const modal = document.getElementById(modalName);
     modal.style.display = 'none';
    modal.classList.remove('show');
    if(modalName !="modalforQuery"){
        console.log(modalName)
    afterAccpectopenModal("modalforQuery")}
   
    // Additional logic for handling the rejection
}


function selectModal (modalName){
    const modal = document.getElementById(modalName);
    modal.style.display = 'none';
    modal.classList.remove('show');
    afterAccpectopenModal("actionModal")
}

