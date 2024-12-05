<script setup lang="ts">
import { ref } from "vue";
import Toaster from "@/Components/ui/toast/Toaster.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import RouterItem from "@/Components/RouterItem.vue";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Link } from "@inertiajs/vue3";
import { Menu } from "lucide-vue-next";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from "@/Components/ui/sheet";
</script>
<template>
    <Toaster />
    <div class="lg:grid min-h-screen lg:grid-cols-[220px_1fr] w-full">
        <!-- <div class="grid min-h-screen min-w-full lg:grid-cols-[280px_1fr]"> -->
        <div class="hidden border-r bg-muted/40 lg:block">
            <div class="flex flex-col h-full max-h-screen gap-2">
                <div
                    class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"
                >
                    <Link
                        href="/"
                        class="flex items-center gap-2 font-semibold"
                    >
                        <span class="">
                            <ApplicationLogo
                                class="block w-auto fill-current h-9"
                        /></span>
                    </Link>
                </div>
                <div class="flex-1">
                    <nav
                        class="grid items-start px-2 text-sm font-medium lg:px-4"
                    >
                        <RouterItem />
                    </nav>
                </div>
                <div class="p-4 mt-auto"></div>
            </div>
        </div>
        <div class="flex flex-col">
            <header
                class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
            >
                <Sheet>
                    <SheetTrigger as-child>
                        <Button
                            variant="outline"
                            size="icon"
                            class="shrink-0 lg:hidden"
                        >
                            <Menu class="w-5 h-5" />
                            <span class="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="flex flex-col">
                        <SheetTitle>
                            <ApplicationLogo
                                class="block w-auto fill-current h-9"
                        /></SheetTitle>
                        <SheetDescription class="hidden"></SheetDescription>
                        <nav class="grid gap-2 py-6 text-lg font-medium">
                            <RouterItem />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div class="flex-1 w-full">
                    <form>
                        <div class="relative">
                            <Input
                                type="search"
                                placeholder="Search..."
                                class="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                </div>
                <div>
                    <Dropdown align="right" width="48">
                        <template #trigger>
                            <span class="inline-flex rounded-md">
                                <button
                                    type="button"
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                >
                                    {{ $page.props.auth.user.name }}

                                    <svg
                                        class="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </template>

                        <template #content>
                            <DropdownLink :href="route('profile.edit')">
                                Profile
                            </DropdownLink>
                            <DropdownLink
                                :href="route('logout')"
                                method="post"
                                as="button"
                            >
                                Log Out
                            </DropdownLink>
                        </template>
                    </Dropdown>
                </div>
            </header>
            <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
                <div class="flex items-center">
                    <h1
                        class="text-lg font-semibold md:text-2xl"
                        v-if="$slots.header"
                    >
                        <slot name="header" />
                    </h1>
                </div>
                <!-- <div
                    class="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
                >
                    <div class="flex flex-col items-center gap-1 text-center">
                        <h3 class="text-2xl font-bold tracking-tight">
                            You have no products
                        </h3>
                        <p class="text-sm text-muted-foreground">
                            You can start selling as soon as you add a product.
                        </p>
                        <Button class="mt-4"> Add Product </Button>
                    </div>
                </div> -->
                <slot />
            </main>
        </div>
    </div>
</template>
