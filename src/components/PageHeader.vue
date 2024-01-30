<template>
    <header class="page-header">
      <div class="logo-container">
        <img src="../assets/images/logo.png" alt="Logo" />
      </div>
      <img src="../assets/images/accountImg.png" alt="Account Image" class="account-image">
    </header>
  </template>
  
  <script>
  export default {
    name: 'PageHeader',
  };
  </script>
  
  <style scoped>
  .page-header {
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo-container img {
    height: 50px; 
  }
  
  nav ul {
    list-style: none;
    display: flex;
  }
  
  nav ul li {
    margin-right: 20px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
  .header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  }

.account-image {
  width: 40px; 
  height: auto;
  border-radius: 50%;
}
  </style>
  