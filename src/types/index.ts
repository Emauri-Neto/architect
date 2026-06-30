export interface IRulebooks<T = IOrigins> {
    sources: Record<string, T[]>
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

export interface IClass {
    name: string,
    label: string,
    role: string,
    description: string,
    stats: {
        hit_points: string,
        effort_points: string,
        sanity: string
    },
    features: string[]
}
