<script lang="ts">
    import { onMount } from "svelte";

    import "@syncfusion/ej2-base/styles/material.css";
    import "@syncfusion/ej2-buttons/styles/material.css";
    import "@syncfusion/ej2-calendars/styles/material.css";
    import "@syncfusion/ej2-dropdowns/styles/material.css";
    import "@syncfusion/ej2-inputs/styles/material.css";
    import "@syncfusion/ej2-splitbuttons/styles/material.css";
    import "@syncfusion/ej2-lists/styles/material.css";
    import "@syncfusion/ej2-navigations/styles/material.css";
    import "@syncfusion/ej2-popups/styles/material.css";
    import "@syncfusion/ej2-schedule/styles/material.css";
    import * as syncfusion from "@syncfusion/ej2-schedule";
    const { WorkWeek } = syncfusion;

    onMount(() => {
        syncfusion.Schedule.Inject(WorkWeek);
        let scheduleObj = new syncfusion.Schedule({
            currentView: "WorkWeek",
            views: ["WorkWeek"],
        });
        scheduleObj.appendTo("#schedule");
    });
</script>

<div id="schedule"></div>
