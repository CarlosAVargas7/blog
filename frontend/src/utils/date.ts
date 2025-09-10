// src/utils/date.ts
export function formatDateDDMMYYYY(input: string | Date): string {
    const d = new Date(input);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${day}-${m}-${y}`;
}

// Opcional: formato local (es-CO), útil para UI humana
export function formatDateLocale(
    input: string | Date,
    locale = "es-CO"
): string {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(input));
}
