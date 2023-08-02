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

       // Handle option selection and close the dropdown
       optionBackgrounds.forEach(option => {
           option.addEventListener('click', () => {
               selectedOption.textContent = option.textContent;
               optionsContainer.style.display = 'none';
               // Dispatch a click event on the custom dropdown to close it
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