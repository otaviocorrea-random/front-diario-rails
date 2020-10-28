<script>
    const list = (async () => {
        const response = await window.fetch('https://api-diario-rails-otavio.herokuapp.com/aprendizados.json', 
        {
            method: 'GET',
            headers: {'otavio': 'ok'}
        })
        return await response.json()
    })()
</script>

<style>

</style>

<svelte:head>
	<title>Diário de Aprendizados</title>
</svelte:head>


{#await list}
	<p>...carregando lista de Aprendizados</p>
{:then data}
    <ul>
        {#each data as item}
            <li>{item.content}</li>
        {/each}
    </ul>
{:catch error}
    {error}
{/await}
