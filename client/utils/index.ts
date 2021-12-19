export const baseUrl = process.env.BASE_URL

export function imageUrl(url: string) {
    return baseUrl + url
}