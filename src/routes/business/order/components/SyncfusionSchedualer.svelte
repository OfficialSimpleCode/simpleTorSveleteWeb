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
    import * as sync from "@syncfusion/ej2-base";
    import * as schedule from "@syncfusion/ej2-schedule";
    const { WorkWeek } = schedule;

    onMount(() => {
        sync.registerLicense(
            "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx0RHxbf1x0ZFRGallSTnddUiweQnxTdEFjWH1ccXRQRWFfV0x2XQ==",
        );
        schedule.Schedule.Inject(WorkWeek);
        let scheduleObj = new schedule.Schedule({
            currentView: "WorkWeek",
            views: ["WorkWeek"],
            allowDragAndDrop: false,
            allowInline: false,
        });
        scheduleObj.appendTo("#schedule");
    });
</script>

<div id="schedule"></div>
