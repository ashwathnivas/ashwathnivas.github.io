<script>
  import { onMount } from 'svelte';

  let sections = [];
  let search = '';

  onMount(() => {
    const secEls = document.querySelectorAll('h2 + .card-grid');
    sections = Array.from(secEls).map((grid) => {
      const heading = grid.previousElementSibling.innerText;
      const cards = Array.from(grid.querySelectorAll('.card'));
      return { heading, cards };
    });
  });

  function filterCards(cards) {
    return cards.filter(c => c.innerText.toLowerCase().includes(search.toLowerCase()));
  }
</script>

<div class="search">
  <input type="text" placeholder="Search posts..." bind:value={search} />
</div>

{#each sections as section}
  <h2>{section.heading}</h2>
  <div class="card-grid">
    {#each filterCards(section.cards) as card (card.innerText)}
      {@html card.outerHTML}
    {/each}
  </div>
{/each}

<style>
.search {
  margin: 1rem;
  text-align: center;
}
input {
  padding: 0.5rem;
  width: 50%;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}
</style>
