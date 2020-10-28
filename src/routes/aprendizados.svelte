<script>
    const list = (async () => {
        const response = await fetch('https://api-diario-rails-otavio.herokuapp.com/aprendizados.json', 
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
	{data}
{:catch error}
    {error}
{/await}
