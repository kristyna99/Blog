<template>
  <div class="modal-background">
    <div class="modal-container">
      <div class="alert alert-danger" role="alert">
        <h2>Smazat Příspěvek</h2>
        <p>Opravdu chcete smazat příspěvek "{{ post ? post.title : '' }}"?</p>
        <button @click="confirmDelete" type="button" id="buttonDelete" class="btn btn-outline-secondary">Smazat</button>
        <button @click="cancelDelete" type="button" class="btn btn-primary">Zrušit</button>
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
    confirmDelete() {
      if (this.post) {
        this.$emit('submit');
      }
    },
    cancelDelete() {
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
  z-index: 1001;
}

.alert {
  width: 300px;
  text-align: center;
}

#buttonDelete{
  margin-right: 15px;
}
</style>
