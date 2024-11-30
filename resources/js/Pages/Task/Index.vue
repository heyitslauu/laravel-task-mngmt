<script setup lang="ts">
import { onMounted } from "vue";
import { defineProps } from "vue";
import { Head } from "@inertiajs/vue3";
import { columns } from "./Table/columns";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import DataTable from "./Table/DataTable.vue";

const props = defineProps<{
    tasks: {
        data: Array<{
            id: number;
            title: string;
            description: string;
            status: string;
        }>;
        current_page: number;
        last_page: number;
    };
}>();

onMounted(() => {
    console.log(props.tasks);
});
</script>

<template>
    <Head title="Tasks" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-primary">
                Tasks
            </h2>
        </template>
        <div>
            <DataTable :data="props.tasks.data" :columns="columns" />
        </div>
    </AuthenticatedLayout>
</template>
