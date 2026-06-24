export interface IRulebooks {
    sources: Record<string, IOrigins[]>
}

export interface IOrigins {
    name: string,
    label: string,
    description: string,
    skills: Skills[],
    ability: string,
    ability_description: string
}

interface Skills {
    label: string,
    name: string
}