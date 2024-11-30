<script setup lang="ts">
import { ref, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { Item } from "@/types/components";

import { PropType } from "vue";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const props = defineProps({
    items: {
        type: Array as PropType<Item[] | (string | number)[]>,
        required: true,
    },
    modelValue: {
        type: String as PropType<string | undefined>, // Use PropType for complex types
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
    },
});

const emits = defineEmits<{
    (e: "update:modelValue", value: Item | string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits);

const isStringOrNumberArray = computed(() => {
    return (
        props.items.length > 0 &&
        (typeof props.items[0] === "string" ||
            typeof props.items[0] === "number")
    );
});
</script>
<template>
    <Select v-model:model-value="modelValue">
        <SelectTrigger>
            <SelectValue class="text-left" :placeholder="placeholder" />
        </SelectTrigger>
        <SelectContent>
            <template v-if="isStringOrNumberArray">
                <SelectItem
                    v-for="item in props.items"
                    :key="item.toString()"
                    :value="item.toString()"
                >
                    {{ item }}
                </SelectItem>
            </template>
            <template v-else>
                <SelectItem
                    v-for="(item, index) in props.items"
                    :key="index"
                    :value="(item as Item).value"
                >
                    {{ (item as Item).label }}
                </SelectItem>
            </template>
        </SelectContent>
    </Select>
</template>

<style scoped></style>
