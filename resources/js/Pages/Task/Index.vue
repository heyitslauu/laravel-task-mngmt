<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { Head, useForm } from "@inertiajs/vue3";
import { columns } from "./Table/columns";
import { PlusCircleIcon } from "lucide-vue-next";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { priorities } from "@/types/components";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/Components/ui/dialog";

import InputError from "@/Components/InputError.vue";
import Button from "@/Components/ui/button/Button.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import DataTable from "./Table/DataTable.vue";
import Selection from "@/Components/Selection.vue";
const props = defineProps<{
    tasks: {
        data: Array<{
            id: number;
            title: string;
            description: string;
            status: string;
            priority: string;
        }>;
        current_page: number;
        last_page: number;
    };
}>();

const tasks = reactive(props.tasks);

const dialogShow = ref<boolean>(false);
const form = useForm({
    title: "",
    description: "",
    priority: "",
});

const submit = async () => {
    form.post(route("tasks.store"), {
        onFinish: () => {
            form.reset("title", "description", "priority");
        },
        onSuccess: () => {
            form.reset("title", "description", "priority");
            dialogShow.value = false;
        },
    });
};
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
            <div class="flex flex-col h-full p-6 space-y-8">
                <div class="flex items-center justify-between space-y-2">
                    <div>
                        <h2 class="text-2xl font-bold tracking-tight">
                            Welcome back!
                        </h2>
                        <p class="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                    <Dialog v-model:open="dialogShow">
                        <Button @click="dialogShow = !dialogShow">
                            <PlusCircleIcon />
                            New Task</Button
                        >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New Task</DialogTitle>
                                <DialogDescription>
                                    Make new task. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                class="flex flex-col gap-2"
                                @submit.prevent="submit"
                            >
                                <div class="flex flex-col gap-2">
                                    <div>
                                        <Label for="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Finish inertia crash course"
                                            v-model="form.title"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.title"
                                        />
                                    </div>
                                    <div>
                                        <Label for="description"
                                            >Description</Label
                                        >
                                        <Input
                                            id="description"
                                            placeholder="Watch taylor otwell's inertia course"
                                            v-model="form.description"
                                        />
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.description"
                                        />
                                    </div>
                                    <div>
                                        <Label for="priority">Priority</Label>

                                        <Selection
                                            :items="priorities"
                                            v-model="form.priority"
                                            placeholder="Set priority level"
                                        ></Selection>
                                        <InputError
                                            class="mt-2"
                                            :message="form.errors.priority"
                                        />
                                    </div>
                                </div>
                                <DialogFooter
                                    class="flex flex-col gap-2 mt-2 md:flex-row md:items-center md:justify-end"
                                >
                                    <DialogClose as-child>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        :disabled="form.processing"
                                        >Add</Button
                                    >
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <DataTable :data="props.tasks.data" :columns="columns" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
