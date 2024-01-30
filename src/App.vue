<template>
  <div id="app">
    <PageHeader />
    <BlogPostPage />
    <PageFooter  />

    <!-- Modal -->
    <div v-show="isModalVisible" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Modal body content -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import BlogPostPage from './BlogPostPage.vue';
import PageFooter from './components/PageFooter.vue';


export default {
  components: {
    BlogPostPage,
    PageFooter,
    PageHeader,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
  }
};
</script>

<style>
/* Your styles */
</style>
