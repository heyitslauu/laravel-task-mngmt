<script setup lang="ts">
import { Link } from "@inertiajs/vue3";

import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>
<template>
    <div class="grid w-screen h-screen md:grid-cols-2">
        <div class="hidden bg-primary md:block"></div>
        <div class="flex flex-col items-center justify-center p-8 bg-secondary">
            <div class="w-full">
                <div class="flex flex-col items-center">
                    <ApplicationLogo class="block w-auto h-24 fill-current" />
                </div>
                <div class="p-6"><slot /></div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
