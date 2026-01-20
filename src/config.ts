export const FREE_QUOTA = {
    maxEventsPerMonth: 100,
    maxEventCategories: 3
} as const

export const CORE_QUOTA = {
    maxEventsPerMonth: 1000,
    maxEventsCategories: 5
} as const

export const GROWTH_QUOTA = {
    maxEventsPerMonth: 10000,
    maxEventsCategories: 7
} as const

export const PREMIUM_QUOTA = {
    maxEventsPerMonth: 100000,
    maxEventsCategories: 10
} as const

export const PLANS = [
    {
        features: [
            "100 real-time events per month",
            "3 event categories per month",
        ],
        price: "$0",
        name: "Free",
        className: "bg-transparent text-brand-700 font-bold border-brand-700 border-2 hover:text-white hover:bg-brand-700 transition-colors duration-200"
    },
    {
        features: [
            "1000 real-time events per month",
            "5 event categories per month",
        ],
        price: "$20",
        name: "Core",
        className: "bg-transparent text-brand-700 font-bold border-brand-700 border-2 hover:text-white hover:bg-brand-700 transition-colors duration-200"
    },
    {
        features: [
            "10000 real-time events per month",
            "7 event categories per month",
        ],
        price: "$49",
        name: "Growth",
    },
    {
        features: [
            "100000 real-time events per month",
            "10 event categories per month",
        ],
        price: "$149",
        name: "Premium",
        className: "bg-transparent text-brand-700 font-bold border-brand-700 border-2 hover:text-white hover:bg-brand-700 transition-colors duration-200"
    }
]