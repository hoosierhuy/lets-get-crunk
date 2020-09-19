<template>
  <div>
    <div class="header">
      <div class="page-header" data-qa-id="header">
        <div style="margin: 0 auto;">
          Cocktails
        </div>
      </div>

      <div>
        <input
          type="text"
          name="search"
          v-model="searchString"
          placeholder="Your fave cocktail..."
          @keyup.enter="search"
        />
        <button type="button" @click="search">Search</button>
      </div>
    </div>

    <CocktailList
      :cocktails="cocktailList"
      @listItemClicked="openRecipe"
      class="content"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import CocktailList from "@/components/CocktailList.vue";

@Component({
  components: {
    CocktailList
  }
})
export default class Home extends Vue {
  private cocktailList: Array<object> = [];
  private cocktail: object = {};
  private searchType = "cocktail";
  private searchString = "";

  async created() {
    const _cocktailList = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
    );

    this.cocktailList = _cocktailList.data.drinks;
  }

  private openRecipe(recipeId: string) {
    this.$router.push({
      name: "cocktail",
      params: {
        id: recipeId
      }
    });
  }

  private async search() {
    // TODO: Use Vue's Suspense when VUE 3 is relased to production.
    let _cocktailList;

    if (this.searchType === "cocktail") {
      _cocktailList = await axios.get(
        // search
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.searchString}`
      );
    } else {
      _cocktailList = await axios.get(
        // filter
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.searchString}`
      );
    }

    this.cocktailList = _cocktailList.data.drinks;
    this.searchString = "";

    // TODO: Create user feedback loop for when libation is not found in the API's database
    // For example:
    /**
      if (this.cocktailList === null) {
        console.log("This concoction does not exist...yet!");
      }
    */
  }
}
</script>

<style scoped lang="css">
.content {
  padding-top: 6.875rem;
}

button {
  border-radius: 4px;
  background-color: #9d2a2c;
  margin-left: 0.25rem;
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 0.85rem;
  line-height: 1;
  padding: 0.25rem;
  text-transform: uppercase;
  border: none;
  color: #fff;
}
</style>
