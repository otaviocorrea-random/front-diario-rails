<script>
   let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<div class="tutorial">
  <h2>Código Svelte: </h2>
  <textarea readonly>
    <script>
      let string = `this string contains some <strong>HTML!!!</strong>`;
    </script>
    
    <p>{"{string}"}</p>
    <p>{"{@html string}"}</p>
  </textarea>

  <h2>Saída: </h2>
  <div class="output">
    <p>{string}</p>
    <p>{@html string}</p>
  </div>
</div>