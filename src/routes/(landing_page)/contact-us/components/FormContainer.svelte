<script lang="ts">
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import CustomTextArea from "$lib/components/custom_components/CustomTextArea.svelte";
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import { contactUsLimitPerSession } from "$lib/consts/limitation";
  import { containerRadius } from "$lib/consts/sizes";
  import type {
    PhonePickerEvent,
    TextFieldEvent,
  } from "$lib/consts/text_fields";
  import { ErrorsController } from "$lib/controllers/errors_controller";
  import {
    HomePageController,
    contactUsSubjectStore,
    markContactUsSubjectStore,
  } from "$lib/controllers/home_page_controller";
  import DeveloperHelper from "$lib/helpers/developer_helper";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import {
    contactUsMessageValidation,
    contactUsSubjectValidation,
    nameValidation,
  } from "$lib/utils/validation_utils";

  let content: string = "";
  $: name = $isConnectedStore ? $userStore.name : "";
  $: phone = $isConnectedStore ? $userStore.phoneNumber : "";
  let loading: boolean = false;
  let subjectValidationResp: string | null = null;

  $: message = {
    message: content,
    phone: phone,
    subject: $contactUsSubjectStore,
    name: name,
  };

  let isValid = {
    message: contactUsMessageValidation(content) == null,
    phone: phone != "",
    subject: $contactUsSubjectStore != "",
    name: name != "",
  };

  isConnectedStore.subscribe((value) => {
    if (value == true) {
      name = $userStore.name;
      phone = $userStore.phoneNumber;
      isValid.name = true;
      isValid.phone = true;
    }
  });

  contactUsSubjectStore.subscribe((value) => {
    isValid.subject = contactUsSubjectValidation(value) == null;
    subjectValidationResp =
      value !== "" ? contactUsSubjectValidation(value) : null;
  });

  async function onSendMessage() {
    if (loading) {
      return;
    }
    if (
      HomePageController.messageContactUsCounter >= contactUsLimitPerSession
    ) {
      ShowToast({
        text: translate("cantSendMoreContactUsPassTheLimit"),
        status: "fail",
      });
      return;
    }

    if (Object.values(isValid).includes(false)) {
      if (!isValid.name) {
        ShowToast({
          text: translate("nameNotValid"),
          status: "fail",
        });
        return;
      }
      if (!isValid.phone) {
        ShowToast({
          text: translate("phoneNotValid"),
          status: "fail",
        });
        return;
      }

      if (!isValid.subject) {
        ShowToast({
          text: translate("subjectNotValid"),
          status: "fail",
        });
        return;
      }
      if (!isValid.message) {
        ShowToast({
          text: translate("messageNotValid"),
          status: "fail",
        });
      }
      return;
    }
    try {
      loading = true;

      const resp = await DeveloperHelper.GI().newMessageFromWebsite(message);
      if (resp) {
        ShowToast({ text: translate("contactSuccess"), status: "success" });
        content = "";
        $contactUsSubjectStore = "";
        HomePageController.messageContactUsCounter += 1;
      } else {
        ErrorsController.displayError();
      }
    } finally {
      loading = false;
    }
  }

  function onChangeName(event: CustomEvent<TextFieldEvent>) {
    message.name = event.detail.value;
    isValid.name = event.detail.isValid;
    name = event.detail.value;
  }

  function onChangeSubject(event: CustomEvent<TextFieldEvent>) {
    message.subject = event.detail.value;
    isValid.subject = event.detail.isValid;
    contactUsSubjectStore.set(event.detail.value);
  }

  function onChangePhone(event: CustomEvent<PhonePickerEvent>) {
    message.phone = event.detail.value ?? "";
    isValid.phone = event.detail.isValid;
    phone = event.detail.value ?? "";
  }

  function onChangeMessage(event: CustomEvent<TextFieldEvent>) {
    message.message = event.detail.value;
    isValid.message = event.detail.isValid;
  }
</script>

<div id="contact-form" class="py-6 lg:w-1/2 lg:mx-2">
  <div
    class="w-full px-4 sm:px-8 py-10 mx-auto overflow-hidden {containerRadius} shadow-2xl lg:max-w-xl bg-base-200"
  >
    <!-- The from -->
    <form class="" on:submit={onSendMessage}>
      <CustomTextFormField
        lableTranslateKey="name"
        validationFunc={nameValidation}
        value={name}
        on:valueChange={onChangeName}
      />

      {#if $isConnectedStore != null}
        <CustomPhoneField
          titleTransKey="phoneNumber"
          value={phone}
          on:phoneChange={onChangePhone}
        />
      {:else}
        <div class="flex flex-row animate-pulse mt-6 gap-3">
          <div class="w-full bg-base-100 {containerRadius} h-12 border-[2px]" />
          <div
            class="w-[30%] bg-base-100 {containerRadius} h-12 border-[2px]"
          />
        </div>
      {/if}

      <CustomTextFormField
        lableTranslateKey="subject"
        bind:value={$contactUsSubjectStore}
        mark={$markContactUsSubjectStore}
        bind:validationResp={subjectValidationResp}
        validationFunc={contactUsSubjectValidation}
        on:valueChange={onChangeSubject}
      />

      <CustomTextArea
        lableTranslateKey="message"
        bind:value={content}
        validationFunc={contactUsMessageValidation}
        on:valueChange={onChangeMessage}
      />

      <button
        class="btn btn-primary w-full px-6 py-3 mt-6 text-sm {containerRadius} {loading
          ? 'opacity-60'
          : ''}"
        on:click={onSendMessage}
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else}
          {translate("sending", $_, false)}
        {/if}
      </button>
    </form>
  </div>
</div>
