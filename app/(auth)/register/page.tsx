"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
  const router = useRouter();
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
        router.push("/login");
      })
      .catch((error: Error) => {
        toast({ title: "Произошла ошибка", description: error?.message });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-64 space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  {...field}
                />
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

        <div className="flex justify-center">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </Form>
  );
};

export default Register;
