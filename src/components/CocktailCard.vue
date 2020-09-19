<template>
  <div class="card" @click="cardAction(cocktail.idDrink)">
    <img
      :src="cocktail.strDrinkThumb"
      :alt="cocktail.strDrink"
      width="200px"
      height="200px"
    />
    <div>{{ cocktail.strDrink }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CocktailCard extends Vue {
  @Prop({
    required: true,
    default: () => {
      return {};
    }
  })
  readonly cocktail!: object;

  private cardAction(cocktailId: string): void {
    this.$emit("cardClicked", cocktailId);
  }
}
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
  min-width: 14.0625rem;
  max-width: 14.0625rem;
  min-height: 15rem;
  max-height: 15rem;
  padding: 0.3125rem 0rem 0.3125rem 0rem;
  border-radius: 3px;
  font-family: "Open Sans", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  text-align: center;

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.4);
  }

  cursor: pointer;
}
</style>
