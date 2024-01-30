import { pushState } from "$app/navigation";


export function openProfileDialog() {
    setTimeout(() => {
        let dialog: HTMLDialogElement = document.getElementById(
            "profileDialog",
        )! as HTMLDialogElement;
        pushState("", {
            showModal: true,
        });
        dialog.showModal();
    }, 200);
}