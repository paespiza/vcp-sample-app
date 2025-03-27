"use client";
import { ComponentProps } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import "../builder-registry";

// ✅ Use your public API key here
builder.init("f154bf67d18c42acae68604617b93b4b");

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

export function RenderBuilderContent(props: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();

  if (props.content || isPreviewing) {
    return <BuilderComponent {...props} />;
  }

  return <DefaultErrorPage statusCode={404} />;
}
