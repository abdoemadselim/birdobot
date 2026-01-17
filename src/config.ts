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