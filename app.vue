<template>
  <div class="layout">
    <Form :validation-schema="schema" v-slot="{ values }" class="form" @submit="onSubmit">
      <UiInput
        name="name"
        type="text"
        label="Name"
        placeholder="Your Name"
        required
      />

      <UiInput
        name="email"
        type="email"
        label="Email"
        placeholder="Your Email"
        required
      />

			<UiInput
				name="phone"
				type="tel"
				label="Phone Number"
				placeholder="Enter Phone"
				required
			/>

      <UiSelect
        name="topic"
        label="Select"
        :options="[
          { value: 'support', text: 'Support' },
          { value: 'feedback', text: 'Feedback' },
          { value: 'other', text: 'Other' },
        ]"
        placeholder="Select Topic"
        required
      />

      <UiMultiSelect
        name="tags"
        label="Multiple Select"
        placeholder="Choose Tags"
        :options="[
          { value: 'js', text: 'JavaScript' },
          { value: 'ts', text: 'TypeScript' },
          { value: 'vue', text: 'Vue.js' },
        ]"
        required
      />

			<UiRadioGroup
				name="contact"
				label="Radio Group"
				:options="[
					{ value: 'email', text: 'Email' },
					{ value: 'phone', text: 'Phone' },
					{ value: 'social', text: 'Social' },
				]"
				required
			/>

			<UiFile
				name="photo"
				label="Upload one Image"
				placeholder="Choose an image"
				accept="image/*"
				required
			/>

			<UiFile
				name="file"
				label="Upload one PDF"
				placeholder="Choose PDF File"
				accept="application/pdf"
				required
			/>

			<UiFile
				name="documents"
				label="Upload Multiple Files"
				placeholder="Choose Files"
				accept="image/*,application/pdf"
				multiple
				required
			/>

			<UiDate
				name="date"
				label="Pick date"
				placeholder="Select a date"
				required
			/>

      <UiTextarea
        name="message"
        label="Message"
        placeholder="Your message..."
      />

      <UiCheckbox name="agree" label="I agree to the terms" required />

      <UiButton text="Send" />

			<div class="values">
				{{ values }}
			</div>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import type { SubmissionHandler } from "vee-validate";
import { emailRegex } from "@/utils/validation/email";
import * as yup from "yup";

// ----- TYPE
type TypeValues = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  tags: string[];
	contact: string;
	photo: File;
	file: File;
	documents: File[];
	date: string;
	message: string;
  agree: boolean;
};

// ----- SCHEMA
const schema = yup.object({
  name: yup.string().required("Is a required field"),
  email: yup
    .string()
    .required("Is a required field")
    .matches(emailRegex, "Enter a valid e-mail (e.g. test@gmail.com)"),
	phone: yup.string()
  	.required("Is a required field")
		.min(10, "Must be at least 10 characters")
    .max(15, "Must be at most 15 characters"),
  topic: yup.string().required("Is a required field"),
  tags: yup.array().of(yup.string()).min(1, "Choose at least one tag"),
	contact: yup.string().required("Choose a contact method"),
	photo: yup
		.mixed<File>()
		.required("Image is required")
		.test("fileType", "Only images allowed", (file) =>
			file.type.startsWith("image/")
		)
		.test("fileSize", "Image must be smaller than 2MB", (file) =>
			file.size != null ? file.size < 2 * 1024 * 1024 : false
		),
	file: yup
		.mixed<File>()
		.required("Upload PDF")
		.test("fileType", "Only PDF files allowed", (file) =>
			file.type === "application/pdf"
		)
		.test("fileSize", "PDF must be smaller than 2MB", (file) =>
			file.size != null ? file.size < 2 * 1024 * 1024 : false
		),
	documents: yup
		.array()
		.default([])
		.min(1, "Upload at least one file")
		.of(
			yup
      .mixed<File>()
      .test("fileType", "Only Images or PDF files allowed", (file) =>
        file?.type.startsWith("image/") || file?.type === "application/pdf"
      )
      .test("fileSize", "File must be smaller than 2MB", (file) =>
        file?.size != null ? file.size < 2 * 1024 * 1024 : false
      )
		),
	date: yup
		.date()
		.nullable()
		.required("Date is required"),
	message: yup.string(),
  agree: yup.boolean().oneOf([true], "You must accept the terms"),
});


// ----- SUBMIT
const onSubmit: SubmissionHandler<any> = async (values: TypeValues) => {
  console.log(values);

	isSending.value = true
  isSent.value = false

  await new Promise((res) => setTimeout(res, 2000))

  console.log("Form sent:", values)

  isSending.value = false
  isSent.value = true

  // через 3 секунди повертаємо кнопку назад
  setTimeout(() => {
    isSent.value = false
  }, 3000)
};
</script>
<style scoped lang="scss">
.layout {
  max-width: 400px;
  margin: 50px auto;

	@include mobile {
		max-width: 90%;
	}
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
