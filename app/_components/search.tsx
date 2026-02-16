"use client"

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// import { string, z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
    search: z.string().trim().min(1, {
        message: "Digite algo para buscar",
    })
});

const SearchBar = () => {

    // const [search, setSearch] = useState("");

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        }
    })
    
    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        // e.preventDefault();
        router.push(`/barbershops?search=${data.search}`)
    }

    return <>
        {/* <form onSubmit={handleSubmit} className="flex gap-2">
            <Input name="search" placeholder="Digite o que procura..." value={search} onChange={e => setSearch(e.target.value)} />
            <Button className="bg-[#8162FF] text-white" type="submit">
                <SearchIcon strokeWidth={3} />
            </Button>
        </form> */}

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-start justify-between gap-2">
                <FormField
                    control={form.control}
                    name="search"
                    render={({field}) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input placeholder="Faça sua busca..." {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="bg-[#8162FF] text-white" type="submit">
                    <SearchIcon strokeWidth={3} />
                </Button>
            </form>
        </Form>
    </>
};

export default SearchBar;