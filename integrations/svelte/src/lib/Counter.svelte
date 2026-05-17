<script lang="ts">
  let count: number = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<kemet-button onclick={increment}>
  count is {count}
</kemet-button>
