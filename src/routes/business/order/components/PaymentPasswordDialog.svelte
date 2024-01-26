<script lang="ts">
  import { Duration } from "$lib/models/core/duration";
  import { businessStore } from "$lib/stores/Business.js";
  import { Icon, LockClosed } from "svelte-hero-icons";

  export let dialog: HTMLDialogElement;
  export let amount: number;

  let timerDuration: Duration = new Duration({ minutes: 5 });

  setInterval(() => {
    timerDuration = timerDuration.subtract(new Duration({ seconds: 1 }));
  }, 1000);

  let password: string = "";

  function onPay() {}
</script>

<dialog
  bind:this={dialog}
  class="modal modal-middle"
  on:close={() => {
    // history.back();
  }}
>
  <div class="modal-box bg-base-200 flex flex-col gap-4 items-center">
    <h1 class="text-2xl text-center font-bold">
      Approve Payment - {amount.toFixed(2)}{$businessStore.currency.symbol}
    </h1>

    <div class="flex flex-col items-center gap-3">
      <div class="flex flex-row items-center justify-center gap-4">
        <div>
          {timerDuration.inMinutes}
          Minutes
        </div>
        <div>
          {timerDuration.inSeconds % 60}
          Seconds
        </div>
      </div>

      <Icon src={LockClosed} size="50px" />
    </div>

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Enter Password</span>
      </div>
      <input
        bind:value={password}
        type="password"
        placeholder="password"
        class="input input-bordered w-full max-w-xs"
      />
    </label>

    <div class="modal-action">
      <button class="btn btn-outline" on:click={() => dialog.close()}>
        Cancel
      </button>
      <button class="btn btn-primary" class:btn-disabled={password.length == 0}>
        Continue
      </button>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
