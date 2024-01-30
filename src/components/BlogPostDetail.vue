<template>
  <div class="modal-background" @click="closeDetail">
    <div class="modal-container" @click.stop>
      <div class="post-details">
        <!-- Zobrazení detailů příspěvku -->
        <div v-if="post">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="details-container">
            <div class="date-category-container">
              <p v-if="post.category" class="post-category">{{ post.category }}</p>
              <p class="post-date">{{ formatDate(post.date) }}</p>
            </div>
          </div>
          <p class="post-content">{{ post.content }}</p>
        </div>
        <button @click="closeDetail" type="button" class="btn btn-primary">Zavřít</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  methods: {
    closeDetail() {
      this.$emit('close');
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('cs-CZ', options);
    },
  },
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  width: 80%; /* Výchozí šířka modálního okna */
}

.post-details {
  text-align: center; /* Zarovnání textu do středu */
}

.post-title {
  margin-bottom: 15px; /* Odsazení pod nadpisem pro lepší vzhled */
}

.details-container {
  display: flex;
  flex-direction: column; /* Přepnutí na sloupcový layout pro datum a kategorii */
  align-items: center;
  text-align: center;
  margin-bottom: 15px; /* Odsazení pod daty pro lepší vzhled */
}

.date-category-container {
  display: flex;
  flex-direction: column; /* Každá položka (datum a kategorie) v novém řádku */
  align-items: center;
}

.post-date,
.post-category {
  margin: 0; /* Nulování marginu pro lepší vzhled */
}

.post-content {
  text-align: justify; /* Zarovnání obsahu do bloku */
}

/* Responzivní chování pro menší obrazovky */
@media (max-width: 768px) {
  .modal-container {
    width: 90%; /* Přizpůsobení šířky pro menší obrazovky */
  }
}
</style>
