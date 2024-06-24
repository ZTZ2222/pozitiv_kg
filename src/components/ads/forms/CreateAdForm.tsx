"use client";

import { zCategoryAttributeRead } from "@/types/category.schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step, Stepper } from "@/components/ui/stepper";
import { toast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { createDynamicSchema } from "@/lib/schemas";
import { z } from "zod";
import DynamicFormStep from "./DynamicFormStep";
import { chunkArray } from "@/lib/utils";

interface CreateAdFormProps {
  attributes: zCategoryAttributeRead[];
}

const CreateAdForm: React.FC<CreateAdFormProps> = ({ attributes }) => {
  const [schema, setSchema] = useState(z.object({}));

  const defaultValues = attributes.reduce<Record<string, any>>((acc, attr) => {
    acc[attr.name] = attr.type === "multiselect" ? [] : "";
    return acc;
  }, {});

  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    setSchema(createDynamicSchema(attributes));
  }, [attributes]);

  const onSubmit = (data: any) => {
    toast({
      title: "Form submitted!",
      description: JSON.stringify(data, null, 2),
    });
  };

  const chunkedAttributes = chunkArray(attributes, 2);

  return (
    <div className="container flex h-screen w-full flex-col gap-4 p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stepper
            variant="circle-alt"
            orientation="horizontal"
            initialStep={0}
            steps={[
              ...chunkedAttributes.map((_, i) => ({
                label: `Step ${i + 1}`,
                description: `Step ${i + 1} description`,
              })),
              { label: "Submit", description: "Review and submit" },
            ]}
            styles={{
              "main-container": "hidden",
            }}
          >
            {chunkedAttributes.map((attrGroup, index) => (
              <Step
                key={index}
                label={`Step ${index + 1}`}
                description={`Step ${index + 1} description`}
              >
                <DynamicFormStep attrGroup={attrGroup} />
              </Step>
            ))}
            <Step label="Submit" description="Review and submit">
              <DynamicFormStep attrGroup={attributes} />
            </Step>
          </Stepper>
        </form>
      </Form>
    </div>
  );
};

export default CreateAdForm;
