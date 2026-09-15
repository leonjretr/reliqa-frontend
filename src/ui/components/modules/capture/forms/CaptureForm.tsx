"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import type { APICategoryListItem } from "@/service/types";
import { FormError } from "@/ui/components/common/FormError";
import { KeptButton } from "@/ui/components/common/KeptButton";
import { Spinner } from "@/ui/components/lib/shadcn";
import { useFilePreview } from "@/ui/hooks";
import { ARRIVALS, captureSchema, type CaptureValues } from "@/ui/validation";

import { useSubmitCapture } from "../hooks";
import {
  ArrivalSection,
  CapturePreview,
  MemorySection,
  PhotoSection,
  ProvenanceSection,
  ThingSection,
} from "../sections";

type Props = {
  categories: APICategoryListItem[];
  keeperName?: string;
  initialCategory?: string;
};

export const CaptureForm = ({ categories, keeperName, initialCategory = "" }: Props) => {
  const t = useTranslations("Capture");
  const form = useForm<CaptureValues>({
    resolver: zodResolver(captureSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: initialCategory,
      tags: [],
      photo: null,
      arrival: ARRIVALS[0],
      previousOwner: "",
      place: "",
      year: "",
      memory: "",
      story: "",
    },
  });
  const { control, formState, handleSubmit, setError } = form;
  const { errors, isSubmitting, isSubmitSuccessful, isValid } = formState;
  const isBusy = isSubmitting || isSubmitSuccessful;
  const photo = useWatch({ control, name: "photo" });
  const preview = useFilePreview(photo);
  const onSubmit = useSubmitCapture(setError);

  return (
    <FormProvider {...form}>
      <div>
        <ThingSection categories={categories} />
        <PhotoSection preview={preview} />
        <ArrivalSection />
        <ProvenanceSection />
        <MemorySection />
        <CapturePreview preview={preview} keeperName={keeperName} />
        <FormError message={errors.root?.message} />
        <KeptButton
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || isBusy}
          className="disabled:bg-stock-2 disabled:text-ink-faint disabled:border-hair mt-4.5 disabled:cursor-default"
        >
          {isBusy && <Spinner />}
          {isBusy ? t("BUTTON_SUBMITTING") : t("BUTTON_SUBMIT")}
        </KeptButton>
      </div>
    </FormProvider>
  );
};
