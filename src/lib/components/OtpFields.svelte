<script lang="ts">
  import type { OtpFieldEvent } from "$lib/consts/text_fields";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let values: string[] = [];
  // Fix the user input to be proper
  function digitValidate(ele: any, inputIndex: number) {
    // Allow only numbers not other types
    const givenVal: string = ele.target.value.replace(/[^0-9]/g, "");

    // Allowed only one char - the last one
    if (givenVal) {
      ele.target.value = ele.target.value[givenVal.length - 1];
    }

    // value dosent change no need to update the listeners
    if (values[inputIndex - 1] === ele.target.value) {
      return;
    }
    // saving the val for the final otp value
    values[inputIndex - 1] = ele.target.value;

    // prepare the event to return
    const eventResp: OtpFieldEvent = {
      value: values.join(""),
    };
    // notify on change event
    dispatch("valueChange", eventResp);

    if (eventResp.value.length === 6) {
      dispatch("compleated", eventResp);
    }
    // notify on done event
  }

  // Make sure the user input is in order
  function handleFocuse(index: number) {
    if (index === 1) {
      return;
    }
    // get all the inputs
    let ele = document.querySelectorAll("input");
    if (ele[index - 2].value == "") {
      ele[index - 2].focus();
    }
  }

  // Handle focuses while the user perfom actions
  function tabChange(val: number) {
    let ele = document.querySelectorAll("input");

    if (ele[val - 1].value != "" && val < ele.length) {
      ele[val].focus();
    } else if (ele[val - 1].value == "" && val > 1) {
      ele[val - 2].focus();
    }
  }
</script>

<div dir="ltr" class="flex flex-row justify-center">
  <form class="my-2">
    {#each [1, 2, 3, 4, 5, 6] as inputIndex}
      {#key inputIndex}
        <input
          autocomplete="one-time-code"
          placeholder={`${inputIndex}`}
          class="w-[50px] h-[50px] mx-1 text-center rounded-xl"
          type="number"
          on:input={(event) => digitValidate(event, inputIndex)}
          on:keyup={() => {
            tabChange(inputIndex);
          }}
          on:focus={() => handleFocuse(inputIndex)}
          maxlength="1"
        />
      {/key}
    {/each}
  </form>
</div>
