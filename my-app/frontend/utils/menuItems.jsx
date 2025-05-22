import { allitemsicon, incompleteicon,completeicon } from "./Icons"

export const menuItems = [
    {
        id: 1,
        title: 'All Tasks',
        icon: allitemsicon,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Completed Tasks",
        icon: completeicon,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Pending Tasks",
        icon: incompleteicon,
        link: "/dashboard",
    },
]