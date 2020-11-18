<script>
  import nearley from "nearley";
  import * as grammar from "./grammar";
  const or = (a, b) => a || b;
  const and = (a, b) => a && b;
  const xor = (a, b) => a != b;
  const implicates = (a, b) => !(a && !b);
  const equiv = (a, b) => a === b;
  const not = (a) => !a;

  let expressionStr = "";
  let result;

  const symbolsMap = {
    "1": true,
    "0": false,
    "∧": and,
    "∨": or,
    "⊕": xor,
    "⇒": implicates,
    "⇔": equiv,
    "(": "(",
    ")": ")",
    "¬": "¬",
  };

  const evaluate = (val) => {
    if (val === null) return;
    if (Object.keys(symbolsMap).includes(val)) {
      return symbolsMap[val];
    } else if (typeof val === "object") {
      console.log(val.length);
      if (val.length === 2) {
        if (evaluate(val[0]) === "¬") {
          return !evaluate(val[1]);
        } else {
          return evaluate(val[1]);
        }
      } else if (val.length === 3) {
        if (evaluate(val[0]) === "(" && evaluate(val[2]) === ")") {
          return evaluate(val[1]);
        } else {
          const operator = evaluate(val[1]);
          if (typeof operator === "function") {
            const arg1 = evaluate(val[0]);
            const arg2 = evaluate(val[2]);
            return operator(arg1, arg2);
          } else {
            console.log("ALARRRM");
          }
        }
      } else {
        return evaluate(val[0]);
      }
    } else {
      console.log(val);
      console.log("ALARRM");
    }
  };

  const calc = () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(expressionStr);
    console.log(parser.results);
    result = evaluate(parser.results);
    console.log(result);
  };
</script>

<style>
  #result {
    height: 20vh;
    font-size: 5rem;
  }
</style>

<main>
  <div>
    <div id="numpad">
      {#each Object.keys(symbolsMap) as symbol}
        <button
          class="symbolbtn"
          on:click={() => {
            expressionStr += symbol;
            calc();
          }}>{symbol}</button>
      {/each}
    </div>

    <form on:submit|preventDefault={calc}>
      <input bind:value={expressionStr} />
      <button
        type="button"
        on:click={() => {
          expressionStr = '';
          result = undefined;
        }}>clear</button>
    </form>

    <div id="result">
      {#if result === true}
        <span style="color:green">1</span>
      {:else if result === false}
        <span style="color:red">0</span>
      {:else}<span />{/if}
    </div>
  </div>
</main>
<p style="position:absolute;bottom:0;text-align:center;width:100%">
  made by Mark Witt, Code:
  <a
    href="https://github.com/teknoalex/logic-calculator/">github.com/teknoalex/logic-calculator/</a>
</p>
