<script>
	let name = 'world';
</script>

<h1>Hello { name.toUpperCase() }!</h1>


<script>
	let src = '/tutorial/image.gif';
	const name = 'man';
</script>

<img {src} alt="A {name} dances.">


<p>This is a styled paragraph.</p>

<style>
	p {
		font-size: 2rem;
		color: blue;
	}
</style>


<script>
	import Nested from './Nested.svelte';
</script>

<p>This is a paragraph.</p>
<Nested/>

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>


<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>


<script>
	let count = 0;

	function incrementCount() {
		count++;
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>


<script>
	let count = 0;
	$: doubled = count * 2;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>


<script>
	let count = 0;

	$: if (count >= 10) {
		alert('count is dangerously high!');
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>


<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers = [...numbers, numbers.length + 1];
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>


