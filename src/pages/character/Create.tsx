import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import attributePentagram from '@/assets/attribute-pentagram.png'
import logoOrdem from '@/assets/logo-ordem.png'
import { Button } from "@/components/ui/button";
import { invoke } from '@tauri-apps/api/core';
import { IClass, IOrigins, IRulebooks } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ATTRIBUTES = [
    // agi
    { id: "agi", x: "50%", y: "18%" },
    // for
    { id: "for", x: "19%", y: "40%" },
    // int
    { id: "int", x: "81.25%", y: "40%" },
    // pre
    { id: "pre", x: "29%", y: "77%" },
    // vig
    { id: "vig", x: "70%", y: "77%" },
] as const

export default function CreateCharPage() {
    const [charName, setCharName] = useState<string>("");
    const [origin, setOrigin] = useState<string>("");
    const [characterClass, setCharacterClass] = useState<string>("");
    const [nex, setNex] = useState<number>(5);
    const [attributes, setAttributes] = useState({
        agi: 1,
        for: 1,
        int: 1,
        pre: 1,
        vig: 1,
    });

    const [originsList, setOriginsList] = useState<IRulebooks<IOrigins> | null>(null);
    const [classesList, setClassesList] = useState<IRulebooks<IClass> | null>(null);
    const [openSources, setOpenSources] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const getRulebooks = async () => {
            const [origins, classes] = await Promise.all([
                invoke<IRulebooks<IOrigins>>("get_origins"),
                invoke<IRulebooks<IClass>>("get_classes"),
            ]);

            setOriginsList(origins)
            setClassesList(classes)
        };

        getRulebooks()
    }, [])

    const updateAttribute = (
        key: keyof typeof attributes,
        amount: number
    ) => {
        setAttributes((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + amount),
        }))
    }

    const defaultNexValues = (stop: number, step: number): number[] => {
        const elements = Array.from({ length: Math.ceil((stop + 1) / step) }, (_, i) => i * step);

        elements.splice(-1, 1, 99)
        return elements
    }

    const submit = () => {
        console.log({
            charName,
            nex,
            origin,
            characterClass,
            attributes,
        })
    }

    return <div className="min-h-screen bg-background font-heading">
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
            <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">Criação de personagem</div>
                    <div className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        Distribua seus pontos, escolha uma origem e defina a classe principal do personagem.
                    </div>
                </div>

                <Button disabled={charName.trim().length <= 0 || !origin || !characterClass} onClick={submit}>
                    Finalizar
                </Button>
            </header>

            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
                <section className="flex min-w-0 flex-col gap-8">
                    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_7rem] sm:items-end">
                        <div className="group relative">
                            <Label
                                className="-translate-y-1/2 absolute top-1/2 block origin-start cursor-text px-1 text-muted-foreground/70 text-sm transition-all group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:text-xs"
                                htmlFor="characterName"
                            >
                                <span className="inline-flex px-2 mx-1 bg-card">
                                    Nome do Personagem
                                </span>
                            </Label>
                            <Input id="characterName" placeholder=" " className="bg-card pr-10 pl-3" onChange={(e) => setCharName(e.target.value)} />
                        </div>

                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="group relative w-full sm:w-28">
                                    <div
                                        className="flex h-10 items-center justify-center border-b bg-card text-sm"
                                    >
                                        {nex}% NEX
                                    </div>

                                    <button
                                        className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                                        onClick={() => nex > 95 ? setNex(Math.max(0, nex - 4)) : setNex(Math.max(0, nex - 5))}
                                    >
                                        <HugeiconsIcon icon={Minus} className="h-4 w-4" />
                                    </button>

                                    <button
                                        className="absolute right-1 top-1/2 -translate-y-1/2 text-foreground opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                                        onClick={() => setNex(Math.min(99, nex + 5))}
                                    >
                                        <HugeiconsIcon icon={Plus} className="h-4 w-4" />
                                    </button>
                                </div>
                            </ContextMenuTrigger>

                            <ContextMenuContent side="bottom">
                                {defaultNexValues(100, 5).map((nex, idx) => (
                                    <ContextMenuItem key={idx} onClick={() => setNex(nex)}>
                                        {nex}
                                    </ContextMenuItem>
                                ))}
                            </ContextMenuContent>
                        </ContextMenu>
                    </div>
                    <div className="border-t pt-6">
                        <ul className="space-y-2 text-sm list-disc pl-4">
                            <li className="text-muted-foreground">Atributos iniciais <span className="text-contrast font-bold">começam em 1.</span></li>
                            <li className="text-muted-foreground"><span className="text-contrast font-bold">4 pontos</span> para distribuir (máximo inicial de 3 por atributo).</li>
                            <li className="text-muted-foreground">Reduzir um atributo para 0 concede <span className="text-contrast font-bold">+1 ponto.</span></li>
                        </ul>
                    </div>

                    <div className="relative mx-auto w-full max-w-100 aspect-square">
                        <img
                            src={attributePentagram}
                            alt="atributos"
                            className="w-full h-auto object-contain"
                        />

                        {ATTRIBUTES.map((attr) => (
                            <div
                                key={attr.id}
                                className="absolute -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: attr.x,
                                    top: attr.y,
                                }}
                            >
                                <div className="group relative w-16 hover:underline">
                                    <div className="flex h-10 items-center justify-center bg-transparent text-2xl">
                                        {attributes[attr.id]}
                                    </div>

                                    <button
                                        className="absolute left-1 top-1/2 -translate-y-1/2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                                        onClick={() => updateAttribute(attr.id, -1)}
                                    >
                                        <HugeiconsIcon icon={Minus} className="h-4 w-4" />
                                    </button>

                                    <button
                                        className="absolute right-1 top-1/2 -translate-y-1/2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                                        onClick={() => updateAttribute(attr.id, 1)}
                                    >
                                        <HugeiconsIcon icon={Plus} className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <p className="pb-4 text-2xl font-semibold text-contrast sm:text-3xl">Classes</p>
                        <div className="grid gap-3">
                            {Object.values(classesList?.sources ?? {}).flat().map((classItem) => (
                                <button
                                    key={classItem.name}
                                    type="button"
                                    onClick={() => setCharacterClass(classItem.name)}
                                    className={cn(
                                        "w-full border border-border bg-card/60 p-4 text-left transition-colors hover:border-contrast hover:bg-card",
                                        characterClass === classItem.name && "border-primary bg-primary/10 text-primary"
                                    )}
                                >
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <div className="text-lg font-semibold text-foreground">{classItem.label}</div>
                                            <div className="text-xs font-bold uppercase tracking-wider text-contrast">{classItem.role}</div>
                                        </div>
                                        {characterClass === classItem.name && (
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Selecionada</span>
                                        )}
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{classItem.description}</p>
                                    <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                                        <span><strong className="text-foreground">PV:</strong> {classItem.stats.hit_points}</span>
                                        <span><strong className="text-foreground">PE:</strong> {classItem.stats.effort_points}</span>
                                        <span><strong className="text-foreground">SAN:</strong> {classItem.stats.sanity}</span>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {classItem.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="inline-flex items-center bg-contrast/10 px-2.5 py-1 text-xs font-medium text-contrast ring-1 ring-inset ring-contrast/20"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="min-w-0">
                    <p className="pb-4 text-2xl font-semibold text-contrast sm:text-3xl">Origens</p>
                    <ScrollArea className="h-[42rem] max-h-[calc(100vh-10rem)] w-full pr-3">
                        <Accordion type="multiple" className="w-full pb-10">
                            {Object.entries(originsList?.sources ?? {}).map(([source, items]) => (
                                <React.Fragment key={source}>
                                    <Collapsible
                                        open={!!openSources[source]}
                                        onOpenChange={(value) =>
                                            setOpenSources((prev) => ({
                                                ...prev,
                                                [source]: value,
                                            }))
                                        }
                                    >
                                        <CollapsibleTrigger className="w-full my-4 hover:border hover:border-contrast transition-colors">
                                            <img
                                                className="h-12 w-full object-cover object-center"
                                                src={logoOrdem}
                                                alt={source}
                                            />
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            {items.map(originItem => (
                                                <AccordionItem value={originItem.name} key={originItem.name} className={cn(origin === originItem.name && "text-primary font-bold bg-primary/10", "border-b border-border")}>
                                                    <AccordionTrigger className="items-center text-base font-semibold transition-colors hover:text-contrast sm:text-lg">
                                                        {originItem.label}
                                                    </AccordionTrigger>

                                                    <AccordionContent className="pb-6 pt-2 text-sm h-full">
                                                        <p className="text-muted-foreground mb-4 leading-relaxed">
                                                            {originItem.description}
                                                        </p>

                                                        <div className="flex flex-col gap-y-5">
                                                            <div className="flex flex-col gap-y-2">
                                                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                                    Perícias Iniciais
                                                                </span>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {originItem.skills.map((skill) => (
                                                                        <span
                                                                            key={skill.label}
                                                                            className="inline-flex items-center bg-contrast/10 px-2.5 py-1 text-xs font-medium text-contrast ring-1 ring-inset ring-contrast/20"
                                                                        >
                                                                            {skill.label}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="border border-border bg-card/50 p-4 shadow-sm">
                                                                <div className="flex items-center gap-x-2 mb-1.5">
                                                                    <span className="font-bold text-sm tracking-wide text-contrast">
                                                                        {originItem.ability}
                                                                    </span>
                                                                </div>
                                                                <p className="text-muted-foreground text-xs leading-relaxed">
                                                                    {originItem.ability_description}
                                                                </p>
                                                            </div>

                                                            <Button onClick={() => setOrigin(originItem.name)}>Escolher</Button>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                </React.Fragment>
                            ))}
                        </Accordion>
                    </ScrollArea>
                </section>
            </div>
        </main>
    </div>
}
