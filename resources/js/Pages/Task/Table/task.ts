import { h } from "vue";
import {
    ClockArrowDown,
    CircleCheck,
    CircleHelp,
    CircleDotDashed,
    Circle,
    CircleDot,
    TriangleAlert,
    Flame,
} from "lucide-vue-next";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export const statuses = [
    {
        value: "todo",
        label: "Todo",
        icon: h(CircleHelp),
    },
    {
        value: "completed",
        label: "Completed",
        icon: h(CircleCheck),
    },
    {
        value: "ongoing",
        label: "ongoing",
        icon: h(ClockArrowDown),
    },
    {
        value: "stale",
        label: "stale",
        icon: h(CircleDotDashed),
    },
];

export const priorities = [
    {
        value: "low",
        label: "Low",
        icon: h(Circle),
    },
    {
        value: "medium",
        label: "Mediun",
        icon: h(CircleDot),
    },

    {
        value: "high",
        label: "High",
        icon: h(TriangleAlert),
    },
    {
        value: "highest",
        label: "Urgent",
        icon: h(Flame),
    },
];
