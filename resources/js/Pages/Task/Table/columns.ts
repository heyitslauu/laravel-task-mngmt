import { h } from "vue";
import { Checkbox } from "@/Components/ui/checkbox";
import { Task, statuses } from "./task";
import { useDateFormat } from "@vueuse/core";
import { Badge } from "@/Components/ui/badge";

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
    {
        accessorKey: "id",
        header: () => h("div", { class: "text-left" }, "ID"),
        cell: ({ row }) => h("div", row.getValue("id")),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: () => h("div", { class: "text-left" }, "Title"),
        cell: ({ row }) => h("div", row.getValue("title")),
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
        accessorKey: "created_at",
        header: () => h("div", { class: "text-left" }, "Created At"),
        cell: ({ row }) => {
            const created = row.getValue("created_at");

            // Safely parse the date or handle invalid cases
            const date = created ? new Date(created as string) : null;

            // Check if `date` is valid
            const formatted =
                date && !isNaN(date.getTime())
                    ? useDateFormat(date, "MMM DD, YYYY").value
                    : "Invalid Date";

            return h("div", { class: "text-left " }, formatted);
        },
        enableSorting: false,
        enableHiding: false,
    },
];
