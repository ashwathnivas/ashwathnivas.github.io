<script>
  export let posts = [];

  let query = "";

  $: filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
</script>

<input type="text" placeholder="Search posts..." bind:value={query} />

<ul>
  {#each filtered as post}
    <li><a href={post.link}>{post.title}</a></li>
  {/each}
</ul>
