<script>
  const name = "world";
  const testVar = "testVarContent";
  let arr = [1, 2];
  const updateArray = ()=>{
    arr = [...arr, 9]
  }
</script>

<h2>Hello {name}</h2>
<div>testVar = {testVar}</div>
<div>arr = {arr}</div>

<button on:click={updateArray}></button>

<style>
  h2 {
    color: darkblue;
  }
</style>