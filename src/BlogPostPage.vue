<template>
  <div class="page-container">
    <img :src="require('@/assets/images/home.png')" alt="Popis obrázku" class="page-image" />

<!-- Tlačítko pro vytvoření nového příspěvku -->
    <button type="button" class="btn btn-create" @click="showCreateForm">
      <span>Vytvoř nový článek</span>
      <img src="@/assets/images/more.png" alt="More Icon" class="more-icon-btn" />
    </button>

    <!-- Filtr pro kategorii -->
    <div class="filter-container">
      <label
        v-for="category in categoriesWithAll"
        :key="category"
        :class="[
          'category-label',
          {'category-label-selected': category === categoryFilter},
          {'category-label-custom': category === 'Cestování'},
        ]"
      >
        <img :src="categoryImages[category]" alt="Category Icon" class="category-icon" /><br>
        <input type="radio" v-model="categoryFilter" :value="category" @change="applyFilters" class="category-radio">
        {{ category }}
      </label>
    </div>

    <!-- Seznam blogových příspěvků -->
    <div class="card-container">
      <div v-for="post in filteredBlogPosts" :key="post.id" class="card">
        <div class="card-body">
          <div class="button-container">
            <img @click="showEditForm(post)" src="@/assets/images/edit.png" alt="Edit Icon" class="icon edit-icon" />
            <img @click="showDeleteForm(post)" src="@/assets/images/delete.png" alt="Delete Icon" class="icon delete-icon" />
          </div>
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.category }}</p>
          <p class="card-text">{{ post.description }}</p>
          <div class="button-container">
            <button @click="showPostDetail(post)" class="btn btn-primary">Detail</button>
          </div>
        </div>
      </div>
    </div>

    
    <component :is="currentModalComponent" v-if="showModal" @close="closeForm" @submit="submitForm" :post="selectedPost" />

    <BlogPostBackground :showBackground="showModal"></BlogPostBackground>
  </div>
</template>

<script>
import BlogPostForm from '@/components/BlogPostForm.vue';
import BlogPostEditForm from '@/components/BlogPostEditForm.vue';
import BlogPostDelete from '@/components/BlogPostDelete.vue';
import BlogPostDetail from '@/components/BlogPostDetail.vue';
import BlogPostBackground from '@/components/BlogPostBackground.vue';

export default {
  components: {
    BlogPostForm,
    BlogPostEditForm,
    BlogPostDelete,
    BlogPostDetail,
    BlogPostBackground,
  },
  data() {
    return {
      blogPosts: [],
      categories: ['Cestování', 'Gastronomie', 'Sport a aktivity', 'Umění a kultura', 'Životní styl'],
      categoryImages: {
        'Cestování': require('@/assets/images/cestovani.png'),
        'Gastronomie': require('@/assets/images/vareni.png'),
        'Sport a aktivity': require('@/assets/images/sport.png'),
        'Umění a kultura': require('@/assets/images/umeni.png'),
        'Životní styl': require('@/assets/images/zivot.png'),
        'Vše': require('@/assets/images/all.png'),
      },
      categoryFilter: '', 
      sortOrder: 'desc', 
      showModal: false, 
      currentModalComponent: null, 
      selectedPost: null, 
    };
  },
  computed: {
    filteredCategories() {
      return ['Vše', ...this.categories];
    },
    categoriesWithAll() {
      return this.categories.concat(['Vše']);
    },
    filteredBlogPosts() {
      let filteredPosts = [...this.blogPosts];

      if (this.categoryFilter && this.categoryFilter !== 'Vše') {
        filteredPosts = filteredPosts.filter(post => post.category === this.categoryFilter);
      }

      if (this.sortOrder === 'desc') {
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      return filteredPosts;
    },
  },
  methods: {
    // Metoda pro zobrazení modálního okna pro vytvoření nového příspěvku
    showCreateForm() {
      this.selectedPost = null;
      this.showModal = true;
      this.currentModalComponent = 'BlogPostForm';
    },
    // Metoda pro zobrazení modálního okna pro editaci příspěvku
    showEditForm(post) {
      this.selectedPost = { ...post };
      this.showModal = true;
      this.currentModalComponent = 'BlogPostEditForm';
    },
    // Metoda pro zobrazení modálního okna pro smazání příspěvku
    showDeleteForm(post) {
      this.selectedPost = post;
      this.showModal = true;
      this.currentModalComponent = 'BlogPostDelete';
    },
    // Metoda pro zobrazení modálního okna s detaily příspěvku
    showPostDetail(post) {
      this.selectedPost = post;
      this.showModal = true;
      this.currentModalComponent = 'BlogPostDetail';
    },
    // Metoda pro zavření modálního okna
    closeForm() {
      this.showModal = false;
      this.currentModalComponent = null;
      this.selectedPost = null;
    },
    // Metoda pro vytvoření nového příspěvku
    createPost(newPost) {
      this.blogPosts.push(newPost);
      this.closeForm();
    },
    // Metoda pro aktualizaci existujícího příspěvku
    updatePost(updatedPost) {
      const index = this.blogPosts.findIndex(post => post.id === updatedPost.id);
      this.blogPosts[index] = updatedPost;
      this.closeForm();
    },
    // Metoda pro smazání příspěvku
    deletePost() {
      const index = this.blogPosts.findIndex(post => post.id === this.selectedPost.id);
      this.blogPosts.splice(index, 1);
      this.closeForm();
    },
    // Metoda pro aplikaci filtrů
    applyFilters() {
      // Filtr podle kategorie
      let filteredPosts = [...this.blogPosts];
      if (this.categoryFilter && this.categoryFilter !== 'Vše') {
        filteredPosts = filteredPosts.filter(post => post.category === this.categoryFilter);
      }
      // Řazení
      if (this.sortOrder === 'desc') {
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      
      this.filteredBlogPosts = filteredPosts;
    },
    // Metoda pro odeslání formuláře
    submitForm(formData) {
      if (this.currentModalComponent === 'BlogPostForm') {
        if (this.selectedPost) {
          this.updatePost(formData);
        } else {
          this.createPost(formData);
        }
      } else if (this.currentModalComponent === 'BlogPostDelete') {
        this.deletePost();
      } else if (this.currentModalComponent === 'BlogPostEditForm') {
        this.updatePost(formData);
      }
    },
  },
  mounted() {
    this.blogPosts = [
      { 
        id: 1, 
        title: 'Nezapomenutelná dovolená v srdci Evropy', 
        category: 'Cestování', 
        description: 'Unikátní dovolená ve střední Evropě. Objevte kouzlo měst, přírody a kulinářských lahůdek. Nezapomenutelná cestovní dobrodružství čekají!', 
        content: "Vítejte ve světě dobrodružství! Cestování je nejen o překonávání vzdáleností, ale také o objevování nových horizontů a obohacování života neopakovatelnými zážitky. V našem posledním dobrodružství jsme prozkoumali skryté krásy střední Evropy. Města s bohatou historií, malebná krajina, a neuvěřitelně přátelští lidé nás přivítali s otevřenou náručí. Zážitky jako procházka starobylými uličkami, ochutnávka místní kuchyně a setkání s místními obyvateli jsou to, co činí cestování nezapomenutelným. V každém místě jsme objevili kus kultury, který nás obohatil. Každý krok byl novým dobrodružstvím, plným překvapení a krásných okamžiků. Závěrem můžeme říci, že cestování není pouze o fyzickém pohybu, ale o otevření mysli a srdce novým možnostem. Přijměte výzvu cestování a objevte krásy světa!",
        date: '2024-01-26' 
      },
      { 
        id: 2, 
        title: 'Kulinarický ráj v srdci Paříže', 
        category: 'Gastronomie', 
        description: 'Objevte lahodné poklady pařížské kuchyně a restaurací. Nechte se unášet chutěmi a vůněmi této gastronomické metropole!', 
        content: "Vítejte ve světě lahodných dobrodružství! Paříž, město lásky, je také městem bohatým na gastronomické požitky. Procházka ulicemi Paříže je jako cesta do ráje pro gurmány. Každá restaurace a kavárna má svůj vlastní jedinečný příběh a nabízí kulinářské zážitky, které nezapomenete. Ochutnejte nejlepší francouzská vína, sýry, a dezerty a nechte se hýčkat chuťovými buňkami. Pařížská gastronomie je kombinací tradic, kreativity a vášně pro dobré jídlo. Přijďte s námi objevit tajemství pařížské kuchyně!",
        date: '2024-01-27' 
      },
      { 
        id: 3, 
        title: 'Adrenalinový zážitek na horách', 
        category: 'Sport a aktivity', 
        description: 'Vydejte se na dovolenou plnou sportovních aktivit a adrenalinových zážitků. Zimní sporty, horská turistika a mnoho dalšího!', 
        content: "Vítejte ve světě dobrodružství a sportovních výzev! Naše dovolená na horách byla plná adrenalinu a nezapomenutelných zážitků. Zimní sporty jako snowboarding a lyžování nám nabídly rychlé sjezdy a úžasnou atmosféru horských středisek. Pro ty, kteří mají raději klidnější aktivity, jsme podnikli horskou turistiku a obdivovali krásu přírody kolem nás. Kromě toho jsme si vychutnali horský vzduch a relaxovali v příjemném horském prostředí. Sport a příroda jsou skvělou kombinací pro aktivní a odpočinkovou dovolenou!",
        date: '2024-01-28' 
      },
      { 
        id: 4, 
        title: 'Festival umění a kultury v Barceloně', 
        category: 'Umění a kultura', 
        description: 'Zážitky z festivalu plného umění, hudby a kultury v srdci Barcelony. Přijďte s námi objevit tajemství této krásné metropole!', 
        content: "Vítejte ve světě umění a kultury! Návštěva festivalu v Barceloně byla jedinečným zážitkem plným barev, hudby a tance. Město nabízí bohatý kulturní program, který zahrnuje umělecké výstavy, koncerty a tradiční tance. Procházka ulicemi Barcelony je jako cesta do historie a současnosti zároveň. Každý roh města skrývá umělecká díla a historické památky, které oživují atmosféru tohoto místa. Přijďte s námi prozkoumat krásu a bohatství umění a kultury v srdci Barcelony!",
        date: '2024-01-29' 
      },
      { 
        id: 5, 
        title: 'Cesta ke zdravému životnímu stylu', 
        category: 'Životní styl', 
        description: 'Návody a tipy pro zdravý životní styl. Od stravování po cvičení, jak dosáhnout rovnováhy ve svém každodenním životě.', 
        content: "Vítejte ve světě zdravého životního stylu! Naše cesta ke zdraví začala změnou stravovacích návyků a pravidelným cvičením. Zdravý životní styl není o extrémních opatřeních, ale o rovnováze a péči o své tělo i mysl. Začali jsme s vyváženou stravou, která obsahuje různorodé potraviny a dává našemu tělu všechny potřebné živiny. Kromě toho jsme začali pravidelně cvičit, což nám přináší nejen fyzickou, ale i duševní pohodu. Zdravý životní styl je cestou ke štěstí a rovnováze ve všech oblastech našeho života.",
        date: '2024-01-30' 
      }
    ];
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.btn-create {
  display: flex;
  align-items: center;
  background-color: #F7559A;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.more-icon-btn {
  margin-left: 5px;
  width: 30px;
}

.btn-create span {
  flex-grow: 1;
}

.page-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.filter-container {
  text-align: center;
  margin-bottom: 20px;
  display: inline-flex;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.category-label {
  display: inline-block; 
  text-align: center; 
  margin: 20px 15px 15px 15px; 
  padding: 15px;
  cursor: pointer; 
  transition: transform 0.3s;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ddd;

  @media screen and (max-width: 768px) {
    font-size: 14px; 
    margin: 15px 8px 8px 0; 
  }

  @media screen and (max-width: 480px) {
    font-size: 12px; 
    margin: 15px 6px 6px 0; 
  }
  
  &:hover {
    transform: scale(1.1); 
  }
}

.category-label-selected {
  background-color: #F7559A;
}

.category-icon {
  width: 50px; 
  height: 50px; 

  
  @media screen and (max-width: 768px) {
    width: 40px; 
    height: 40px; 
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px; 
  }
}

.category-radio {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  margin: 10px;
  width: 18rem;
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  margin-bottom: 10px;
  text-align: center;
}

.card-text{
  text-align: center;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  position: absolute;
  margin: 10px 10px 10px 0;
}

.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: border 0.3s ease; 
}

.icon:hover {
  border: 2px solid blue; 
}

.edit-icon {
  margin-right: 15px;
}

.delete-icon {
  margin-right: 0;
}

.btn-primary {
  background-color: #F7559A;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #D9427E;
}

@media (max-width: 768px) {
  .card {
    width: 80%;
  }
}

.page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.page-overlay img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-container {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  text-align: center;
}

.modal-header {
  background-color: #F7559A;
  color: #fff;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  background-color: #F7559A;
  padding: 15px;
  text-align: right;
}

.modal-footer button {
  background-color: #fff;
  color: #F7559A;
  border: none;
  padding: 8px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.modal-footer button:hover {
  background-color: #ddd;
}

.more-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.more-icon:hover {
  filter: brightness(85%);
}

.blog-post-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: 999;
  filter: blur(5px);
}
</style>
