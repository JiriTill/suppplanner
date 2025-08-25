export function sanitizeList(text: string): string[] {
return (text || '')
.split(/\r?\n|,/) // lines or commas
.map(x=>x.trim())
.filter(Boolean);
}
