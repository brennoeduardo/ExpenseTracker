export function formatDate(data: string | Date): string {
    return new Date(data).toLocaleDateString('pt-BR', {
        timeZone: 'UTC'
    });
}