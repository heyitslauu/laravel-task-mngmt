<script setup lang="ts">
import { Button } from "@/Components/ui/button";

import { useForm } from "@inertiajs/vue3";
import { useToast } from "@/Components/ui/toast/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { priorities } from "@/types/components";
import { Input } from "@/Components/ui/input";

import { Label } from "@/Components/ui/label";
import Selection from "@/Components/Selection.vue";
import InputError from "@/Components/InputError.vue";
import { MoreHorizontal } from "lucide-vue-next";
import { type Task } from "./task";
import { PropType, ref } from "vue";

const { toast } = useToast();

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/Components/ui/dialog";

const isViewOpen = ref(false);
const selectedTask = ref<Task | null>(null);

const openDialog = (task: Task) => {
    selectedTask.value = task;
    isViewOpen.value = true;

    console.log(selectedTask.value);

    form.title = selectedTask.value.title;
    form.description = selectedTask.value.description;
    form.priority = selectedTask.value.priority;
};

const form = useForm({
    title: "",
    description: "",
    priority: "",
});

const props = defineProps({
    task: {
        type: Object as PropType<Task>, // Use PropType for TypeScript types
        required: true,
    },
});

function copy(id: number) {
    console.log(id);
}

const update = async () => {
    form.put(route("tasks.update", { task: selectedTask?.value?.id }), {
        onFinish: () => {
            console.log("finish");
        },
        onSuccess: () => {
            isViewOpen.value = false;
            toast({
                description: "Updated successfully",
            });
        },
    });
};
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem @click="openDialog(task)">
                Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <Dialog v-model:open="isViewOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle class="uppercase">Edit Task</DialogTitle>
                <DialogDescription class="">
                    Edit task Details
                </DialogDescription>
            </DialogHeader>
            <form class="flex flex-col gap-2" @submit.prevent="update">
                <div class="flex flex-col gap-2">
                    <div>
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Finish inertia crash course"
                            v-model="form.title"
                        />
                        <InputError class="mt-2" :message="form.errors.title" />
                    </div>
                    <div>
                        <Label for="description">Description</Label>
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
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" :disabled="form.processing"
                        >Edit</Button
                    >
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
