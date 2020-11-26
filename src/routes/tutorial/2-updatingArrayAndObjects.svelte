<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers[numbers.length] = numbers.length + 1;
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<div class="tutorial">
  <h2>Código Svelte: </h2>
  <textarea readonly>
    <script>
      let numbers = [1, 2, 3, 4];
    
      {"function addNumber() {"}
        numbers[numbers.length] = numbers.length + 1;
     {"}"}
    
      $: sum = numbers.reduce((t, n) => t + n, 0);
    </script>
    
    <p>{"{numbers.join(' + ')} = {sum}"}</p>
    
    {"<button on:click={addNumber}>"}
      Add a number
    {"</button>"}
  </textarea>

  <h2>Saída: </h2>
  <div class="output">
    <p>{numbers.join(' + ')} = {sum}</p>

    <button on:click={addNumber}>
      Add a number
    </button>
  </div>
  
</div>