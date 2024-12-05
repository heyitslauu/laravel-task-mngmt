import { h } from "vue";
import { Checkbox } from "@/Components/ui/checkbox";
import { Task, statuses, priorities } from "./task";
import { useDateFormat } from "@vueuse/core";
import { Badge } from "@/Components/ui/badge";
import DropdownAction from "./DropdownAction.vue";

import type { ColumnDef } from "@tanstack/vue-table";

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) =>
            h(Checkbox, {
                checked:
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate"),
                "onUpdate:checked": (value) =>
                    table.toggleAllPageRowsSelected(!!value),
                ariaLabel: "Select all",
                class: "translate-y-0.5",
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                checked: row.getIsSelected(),
                "onUpdate:checked": (value) => row.toggleSelected(!!value),
                ariaLabel: "Select row",
                class: "translate-y-0.5",
            }),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     accessorKey: "id",
    //     header: () => h("div", { class: "text-left" }, "ID"),
    //     cell: ({ row }) => h("div", row.getValue("id")),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "title",
        header: () => h("div", { class: "text-left" }, "Title"),
        cell: ({ row }) => h("div", row.getValue("title")),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "description",
        header: () => h("div", { class: "text-left" }, "Description"),
        cell: ({ row }) =>
            h(
                "div",
                { class: "max-w-[200px] truncate " },
                row.getValue("description")
            ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: () => h("div", { class: "text-left" }, "Status"),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            );

            if (!status) return null;

            return h("div", { class: "flex w-[100px] items-center" }, [
                status.icon &&
                    h(status.icon, {
                        class: "mr-2 h-4 w-4 text-muted-foreground",
                    }),
                h("span", { class: "capitalize" }, status.label),
            ]);
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        // enableSorting: false,
        // enableHiding: false,
    },
    {
        accessorKey: "priority",
        header: () => h("div", { class: "text-left" }, "Priority Level"),
        cell: ({ row }) => {
            const priority = priorities.find(
                (prio) => prio.value === row.getValue("priority")
            );

            if (!priority) return null;

            const textColorClass =
                {
                    medium: "text-yellow-600", // Medium Priority
                    high: "text-orange-600", // High Priority
                    highest: "text-red-600", // Highest Priority
                }[priority.value] || "text-muted-foreground"; // Default color

            return h("div", { class: "flex w-[100px] items-center" }, [
                priority.icon &&
                    h(priority.icon, {
                        class: `mr-2 h-4 w-4 ${textColorClass}`, // Apply dynamic text color
                    }),
                h("span", { class: "capitalize" }, priority.label),
            ]);
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    // {
    //     accessorKey: "created_at",
    //     header: () => h("div", { class: "text-left" }, "Created At"),
    //     cell: ({ row }) => {
    //         const created = row.getValue("created_at");

    //         // Safely parse the date or handle invalid cases
    //         const date = created ? new Date(created as string) : null;

    //         // Check if `date` is valid
    //         const formatted =
    //             date && !isNaN(date.getTime())
    //                 ? useDateFormat(date, "MMM DD, YYYY").value
    //                 : "Invalid Date";

    //         return h("div", { class: "text-left " }, formatted);
    //     },
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const task = row.original as Task;

            return h(
                "div",
                { class: "relative" },
                h(DropdownAction, {
                    task: { ...task }, // Convert id to string
                })
            );
        },
    },
];
