/**
 * Extracts the clean street address from the raw scraped address string.
 * Raw format: "Pharmacy Name, street address Téléphone : 0535... Quartier : Agdal Ville : Fes..."
 */
export function parseAddress(raw?: string): string {
    if (!raw) return '';
    // Cut everything from "Téléphone" onwards
    const cut = raw.split(/T[eé]l[eé]phone\s*:/i)[0].trim().replace(/,\s*$/, '');
    return cut;
}

/**
 * Extracts the quartier from the raw scraped address string.
 */
export function parseQuartier(raw?: string): string {
    if (!raw) return '';
    const match = raw.match(/Quartier\s*:\s*([^\n]+?)(?:\s+Ville|$)/i);
    return match ? match[1].trim() : '';
}
