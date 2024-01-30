<template>
    <footer>
      <div class="footer-content">
        <p>&copy; 2024 VivaLife Blog</p>
        <div class="contact-info">
          <p>Kontakt: můj.email@seznam.cz</p>
          <p class="phone">Telefon: 777 777 777</p>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  footer {
    background-color: #a2c2e347;
    padding: 20px;
    text-align: center;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
  }
  footer {
  background-color: #9c9c9c47;
  padding: 20px;
  text-align: center;
  width: 100%; 
}

.footer-content {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 600px) {
  .contact-info {
    flex-direction: column; 
  }

  .phone {
    order: -1; 
  }
}
  </style>
  