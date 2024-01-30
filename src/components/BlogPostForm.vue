<template>
  <div class="modal-background" @click="handleCancel">
    <div class="modal-container" @click.stop>
      <div>
        <h2>{{ isEditing ? 'Editace příspěvku' : 'Vytvořit nový příspěvek' }}</h2>

        <form @submit.prevent="handleSubmit" class="overview-form">

          <div class="mb-3">
            <label for="title" class="form-label">Název:</label>
            <input type="text" v-model="editedPost.title" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="category" class="form-label">Kategorie:</label>
            <select v-model="editedPost.category" class="form-select" required>
              <option value="" disabled>Vyberte kategorii</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Popis (max 100 znaků):</label>
            <textarea v-model="editedPost.description" class="form-control" maxlength="100" required></textarea>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label">Obsah:</label>
            <textarea v-model="editedPost.content" class="form-control" required></textarea>
          </div>

          <div class="mb-3">
            <label for="date" class="form-label">Datum:</label>
            <input type="date" v-model="editedPost.date" class="form-control" required />
          </div>

          <button type="submit" class="btn btn-primary">{{ isEditing ? 'Uložit změny' : 'Vytvořit příspěvek' }}</button>
          <button type="button" @click="handleCancel" class="btn btn-secondary">Zrušit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEditing: Boolean,
    post: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      editedPost: this.post ? { ...this.post } : {
        title: '',
        category: '',
        description: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
      },
      categories: ['Cestování', 'Gastronomie', 'Sport a aktivity', 'Umění a kultura', 'Životní styl'],
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.editedPost);
      this.$emit('close');
    },
    handleCancel() {
      this.$emit('close');
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
}

.overview-form {
  max-width: 400px;
  margin: auto;
}

.overview-form .btn {
  width: 100%;
  margin-top: 10px;
}
</style>
