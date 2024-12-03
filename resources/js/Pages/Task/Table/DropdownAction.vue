<script setup lang="ts">
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-vue-next";
import { type Task } from "./task";
import { PropType, ref } from "vue";

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
};

const props = defineProps({
    task: {
        type: Object as PropType<Task>, // Use PropType for TypeScript types
        required: true,
    },
});

function copy(id: number) {
    console.log(id);
}
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
                <DialogTitle class="uppercase">{{
                    selectedTask?.title
                }}</DialogTitle>
                <DialogDescription class="hidden">
                    Task Details
                </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col gap-2">
                <div>
                    {{ selectedTask?.description }}
                </div>
            </div>
            <DialogFooter
                class="flex flex-col gap-2 mt-2 md:flex-row md:items-center md:justify-end"
            >
                <DialogClose as-child>
                    <Button type="button" variant="secondary"> Close </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
