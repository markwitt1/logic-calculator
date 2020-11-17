<script>

	import BinaryTree from "./BinaryTree";
	import symbols from "./symbols.json";

	
	const or = (a, b) => a || b;
    const and = (a, b) => a && b;
    const xor = (a, b) => a != b;
    const implicates = (a, b) => !(a && !b);
	const equiv = (a, b) => a === b;
	

	const tree = new BinaryTree();
	let expressionStr = "";
</script>

<main>
	{#each Object.entries(symbols) as symbol}
		<button on:click={()=>{tree.add(symbol[0])}}>{symbol[1]}</button>
	{/each}
	<button on:click={()=>{
		console.log(tree);
		console.log(tree.toString());
		console.log(tree.evaluate());
	}}>eval</button>

	{expressionStr}
</main>

<style>

</style>