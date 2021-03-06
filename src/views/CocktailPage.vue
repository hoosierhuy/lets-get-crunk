<template>
  <div>
    <div class="header">
      <div class="page-header" data-qa-id="header">
        <span @click="goBack" class="go-back">&larr;</span>
        <div style="margin: 0 auto;">
          Cocktails
        </div>
      </div>
    </div>
    <div class="content">
      <div class="detail-header" data-qa-id="name">
        {{ cocktail.strDrink }}
      </div>

      <div class="picture">
        <img
          :src="cocktail.strDrinkThumb"
          :alt="cocktail.strDrink"
          height="350px"
          data-qa-id="image"
        />
      </div>

      <div class="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul class="ingredient-list">
          <li
            v-for="(ingredient, index) in cocktailIngredients"
            :key="index"
            data-qa-name="cocktail-ingredient"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>

      <div class="recipe-instructions">
        <h3>Instructions</h3>
        <p style="margin-left: 0.625rem" data-qa-id="instructions">
          {{ cocktail.strInstructions }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CocktailPage extends Vue {
  private cocktail: { [key: string]: string | null } = {};

  get cocktailIngredients(): Array<string> {
    const cocktailIngredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientNameKey = `strIngredient${i}`;
      const ingredientAmtKey = `strMeasure${i}`;

      if (this.cocktail[ingredientNameKey]) {
        const ingredientAmt = this.cocktail[ingredientAmtKey] || "";
        const ingredientName = this.cocktail[ingredientNameKey] || "";

        const ingredient = `${ingredientAmt.trim()} ${ingredientName.trim()}`;

        cocktailIngredients.push(ingredient);
      }
    }

    return cocktailIngredients;
  }

  async created() {
    const cocktail = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.$route.params.id}`
    );

    this.cocktail = cocktail.data.drinks[0];
  }

  private goBack() {
    this.$router.push({
      name: "Home"
    });
  }
}
</script>

<style lang="scss" scoped>
.go-back {
  margin-left: 0.625rem;

  &:hover {
    cursor: pointer;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 3.125rem 21.875rem 1fr;
  grid-template-areas:
    "title title"
    "image image"
    "ingredients instructions";
  grid-row-gap: 0.625rem;

  color: rgb(16, 14, 23);
  padding-top: 3.75rem;
}

.detail-header {
  grid-area: title;
  text-align: center;
  font-size: 1.875rem;
}

.picture {
  grid-area: image;
  justify-self: center;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.3);
}

.recipe-ingredients {
  grid-area: ingredients;
  font-family: "Open Sans", sans-serif;
}

.recipe-instructions {
  grid-area: instructions;
  font-family: "Open Sans", sans-serif;
}

.ingredient-list {
  text-align: left;
  display: inline-block;
  margin-top: 0;
}

ul {
  list-style-type: none;
}

h3 {
  margin-left: 0.625rem;
}
</style>
