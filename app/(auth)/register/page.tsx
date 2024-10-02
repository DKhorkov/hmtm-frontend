"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { z } from "zod";

import { gql } from "@/graphql";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Введите действительную почту"),
  password: z.string().min(8, "Минимум 8 символов"),
});

const SIGN_UP = gql(`
  mutation RegisterUser($input: RegisterUser!) {
    registerUser(input: $input)
  }
`);

const Register = () => {
  const { toast } = useToast();
  const [register] = useMutation(SIGN_UP);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(credentials: z.infer<typeof formSchema>) {
    register({ variables: { input: { credentials } } })
      .then(() => {
        toast({ title: "Вы успешно зарегистрировались" });
        redirect("/login");
      })
      .catch((error: Error) => {
        toast({ title: "Произошла ошибка", description: error?.message });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
};

export default Register;
