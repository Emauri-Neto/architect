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
import { IRulebooks } from "@/types";
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
    const [nex, setNex] = useState<number>(5);
    const [attributes, setAttributes] = useState({
        agi: 1,
        for: 1,
        int: 1,
        pre: 1,
        vig: 1,
    });

    const [originsList, setOriginsList] = useState<IRulebooks | null>(null);
    const [openSources, setOpenSources] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const getOrigins = async () => {
            const origins = await invoke<IRulebooks>("get_origins");
            setOriginsList(origins)
        };

        getOrigins()
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
            attributes,
        })
    }

    return <div className="flex flex-col h-screen items-center font-heading">
        <div className="w-full max-w-7xl flex m-10 p-10">
            <div className="w-full h-full flex flex-col">
                <div className="text-xl font-semibold leading-tight">Criação de personagem</div>
                <div className="text-sm leading-tight text-muted-foreground">
                    Distribua seus pontos para definir os pontos fortes e fracos do personagem.
                </div>

                <div className="flex gap-4 items-center">
                    <div className="group relative my-4">
                        <Label
                            className="-translate-y-1/2 absolute top-1/2 block origin-start cursor-text px-1 text-muted-foreground/70 text-sm transition-all group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:text-xs"
                            htmlFor="characterName"
                        >
                            <span className="inline-flex px-2 mx-1 bg-card">
                                Nome do Personagem
                            </span>
                        </Label>
                        <Input id="characterName" placeholder=" " className="bg-card dark:bg-card pr-10 pl-3" onChange={(e) => setCharName(e.target.value)} />
                    </div>

                    <ContextMenu>
                        <ContextMenuTrigger>
                            <div className="group relative w-28">
                                <div
                                    className="flex text-sm h-10 items-center justify-center border bg-card"
                                >
                                    {nex}% NEX
                                </div>

                                <button
                                    className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100 text-foreground"
                                    onClick={() => nex > 95 ? setNex(Math.max(0, nex - 4)) : setNex(Math.max(0, nex - 5))}
                                >
                                    <HugeiconsIcon icon={Minus} className="h-4 w-4" />
                                </button>

                                <button
                                    className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100 text-foreground"
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
                <div className="max-w-100 border-t pt-6">
                    <ul className="space-y-2 text-sm list-disc pl-4">
                        <li className="text-muted-foreground">Atributos iniciais <span className="text-contrast font-bold">começam em 1.</span></li>
                        <li className="text-muted-foreground"><span className="text-contrast font-bold">4 pontos</span> para distribuir (máximo inicial de 3 por atributo).</li>
                        <li className="text-muted-foreground">Reduzir um atributo para 0 concede <span className="text-contrast font-bold">+1 ponto.</span></li>
                    </ul>
                </div>
                <div className="relative w-full max-w-100 aspect-square">

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
                                    className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100"
                                    onClick={() => updateAttribute(attr.id, -1)}
                                >
                                    <HugeiconsIcon icon={Minus} className="h-4 w-4" />
                                </button>

                                <button
                                    className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100"
                                    onClick={() => updateAttribute(attr.id, 1)}
                                >
                                    <HugeiconsIcon icon={Plus} className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-end">
                    <Button disabled={charName.trim().length <= 0} onClick={submit}>
                        Finalizar
                    </Button>
                </div>

                <div className="mt-4 py-3 h-full px-4">
                    <p className="font-semibold text-3xl text-contrast pb-4">Origens</p>
                    <ScrollArea className="w-full h-full">
                        <Accordion type="multiple" className="w-full sm:pr-4 pb-32">
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
                                        <CollapsibleTrigger className="w-full my-4">
                                            <img
                                                className="object-fill object-center w-full h-12"
                                                src={logoOrdem}
                                                alt={source}
                                            />
                                            {/* {source} */}
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            {items.map(originItem => (
                                                <AccordionItem value={originItem.name} key={originItem.name} className={cn(origin === originItem.name && "text-primary font-bold bg-primary/10", "border-b border-border")}>
                                                    <AccordionTrigger className="text-lg font-semibold hover:text-contrast transition-colors">
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

                                                            <div className="rounded-lg border border-border bg-card/50 p-4 shadow-sm">
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
                            ))
                            }
                        </Accordion>
                    </ScrollArea>
                </div>
            </div>
        </div>
        asdf
    </div>
}