<script>
export default {
  data() {
    return {
      // ...
      formData: {
        title: '',
        category: '',
        description: '',
        content: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
      },
    },
  },
};
</script>
