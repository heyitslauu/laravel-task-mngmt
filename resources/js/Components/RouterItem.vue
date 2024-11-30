<script setup lang="ts">
import { routeList } from "@/router";
import { Link } from "@inertiajs/vue3";
import { usePage } from "@inertiajs/vue3";
const { url } = usePage();
</script>

<template>
    <Link
        v-for="route in routeList"
        :key="route.name"
        :href="route.path"
        :class="{
            'flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:scale-105': true,
            'bg-primary text-white': route.path.startsWith(url),
        }"
    >
        {{ route.meta.title }}
    </Link>
</template>
