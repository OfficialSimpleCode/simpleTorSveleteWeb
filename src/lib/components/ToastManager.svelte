<script lang="ts">
  import type { Toast } from "$lib/stores/ToastManager";
  import { currentToast } from "$lib/stores/ToastManager";
  import GeneralIcon from "./custom_components/GeneralIcon.svelte";

  let toast: Toast;
  currentToast.subscribe((t) => (toast = t as Toast));
  const toastIcons = {
    success: "ep:success-filled",
    fail: "mdi:close-circle",
    info: "material-symbols:info",
    warning: "mdi:alert",
  };

  const toastColors = {
    success: "bg-green-500",
    fail: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };
</script>

{#if toast != null}
  <div
    id="toast"
    class="fixed bottom-8 w-full z-50 flex items-center justify-center"
  >
    <div class="min-w-[250px]">
      <div
        role="alert"
        class="alert border-[.5px] {toastColors[
          toast.status
        ]}  bg-opacity-50 backdrop-blur-lg text-base-content"
      >
        <GeneralIcon icon={toastIcons[toast.status]} />

        <span class="text-sm">{toast.text}</span>
      </div>
    </div>
  </div>
{/if}
