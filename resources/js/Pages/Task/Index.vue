<script setup lang="ts">
import { defineProps } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
// Define the type of the tasks prop
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

// Method to navigate to a different page
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
            <div>
                <h1>This is the Index</h1>

                <!-- Loop through tasks and display them -->
                <div v-for="task in props.tasks.data" :key="task.id">
                    <h2>{{ task.title }}</h2>
                    <p>{{ task.description }}</p>
                    <p>Status: {{ task.status }}</p>
                </div>

                <!-- Pagination -->
                <div v-if="props.tasks.last_page > 1">
                    <button
                        v-if="props.tasks.current_page > 1"
                        @click="console.log(props.tasks.current_page - 1)"
                    >
                        Previous
                    </button>
                    <button
                        v-if="props.tasks.current_page < props.tasks.last_page"
                        @click="console.log(props.tasks.current_page + 1)"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* Add your styles here */
</style>
