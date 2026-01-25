import { FIELD_RULES_TYPE } from "./schemas/category-event"

export const evaluateFieldRule = (rules: FIELD_RULES_TYPE[] | undefined, eventFields: Record<string, string | number | boolean>) => {
    const operators = {
        eq: (a: number, b: number) => a === b,
        neq: (a: number, b: number) => a !== b,
        gt: (a: number, b: number) => Number(a) > Number(b),
        gte: (a: number, b: number) => Number(a) >= Number(b),
        lt: (a: number, b: number) => Number(a) < Number(b),
        lte: (a: number, b: number) => Number(a) <= Number(b),
        contains: (a: string, b: string) => String(a).toLowerCase().includes(String(b).toLowerCase()),
        notContain: (a: string, b: string) => !String(a).toLowerCase().includes(String(b).toLowerCase()),
        startsWith: (a: string, b: string) => String(a).toLowerCase().startsWith(String(b).toLowerCase()),
        endsWith: (a: string, b: string) => String(a).toLowerCase().endsWith(String(b).toLowerCase()),
    };

    let isPassed = true

    if (!rules) return isPassed

    rules?.forEach((rule) => {
        const fieldValue = eventFields[rule.name];
        const operator = operators[rule.rule];

        if (!operator) {
            return
        }

        // @ts-ignore
        if (rule.relevance === "and" && !operator(fieldValue, rule.value)) {
            isPassed = false
        }

        // @ts-ignore
        if (rule.relevance === "or" && operator(fieldValue, rule.value)) {
            isPassed = true
        }
    });

    return isPassed
}