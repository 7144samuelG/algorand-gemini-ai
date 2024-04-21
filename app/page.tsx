"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState } from "react";
const formschema = z.object({
  question: z.string().min(3),
});
export default function Home() {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const surpriseOptions = [
    "what is cancer",
    "Types of cancer",
    "causes of cancer",
    "prevention and treatment of cancer",
  ];
  const suprise = () => {
    const randomSuprise =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomSuprise);
  };
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      question: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (value: z.infer<typeof formschema>) => {
    setValue(value.question);
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        history: chatHistory,
        message: value.question,
      }),
    });
    const data = await response.text();
    setChatHistory((oldhistory) => [
      ...oldhistory,
      {
        role: "user",
        parts: [{ text: value.question }],
      }, {
        role: "model",
        parts: [{ text: data }],
      },
    ]);
    console.log(data);
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <h1 className="font-semibold text-[42px] text-center mt-[60px]">
        Get your all cancer questions answered by a well trained model CANCER
        SPECIFIC GEMINI AI CHATBOT
      </h1>
      <h1 className="font-semibold text-[22px] text-center mt-[60px]">
        from question to answer
      </h1>


      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="P-4 pb-6 relative">
                      <Input
                        disabled={isLoading}
                        placeholder="Ask anything any question about cancer"
                        {...field}
                        className="px-14 py-6 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 "
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="mt-4 overflow-scroll">
        {chatHistory.map((val, _index) => (
          <div key={_index} >
            <p className="py-[13px] px-[14px] m-[5px] text-[15px] font-medium border rounded-[6px]">
              {val.role}:{val.parts[0].text }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
