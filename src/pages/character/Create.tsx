import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import attributePentagram from '@/assets/attribute-pentagram.png'

const ATTRIBUTES = [
    // agi
    { id: "agi", x: "26%", y: "18%" },
    // for
    { id: "for", x: "10%", y: "39%" },
    // int
    { id: "int", x: "42.5%", y: "39%" },
    // pre
    { id: "pre", x: "15%", y: "76%" },
    // vig
    { id: "vig", x: "36.5%", y: "76%" },
] as const

export default function CreateCharPage() {
    const [nex, setNex] = useState<number>(5);
    const [attribute, setAttribute] = useState({
        agi: 1,
        for: 1,
        int: 1,
        pre: 1,
        vig: 1,
    });

    console.log(attribute)

    const updateAttribute = (
        key: keyof typeof attribute,
        amount: number
    ) => {
        setAttribute((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + amount),
        }))
    }

    const defaultNexValues = (stop: number, step: number): number[] => {
        const elements = Array.from({ length: Math.ceil((stop + 1) / step) }, (_, i) => i * step);

        elements.splice(-1, 1, 99)
        return elements
    }

    return <div className="flex h-screen justify-center font-heading">
        <div className="w-full max-w-7xl bg-accent flex m-10 p-10">
            <div className="w-full flex flex-col">
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
                        <Input id="characterName" placeholder=" " className="bg-card dark:bg-card pr-10 pl-3" />
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

                <div className="relative w-full max-w-3xl">
                    <img
                        src={attributePentagram}
                        alt="atributos"
                        width={400}
                        height={400}
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
                            <div className="group relative w-16">
                                <div className="flex h-10 items-center justify-center bg-transparent text-xl">
                                    {attribute[attr.id]}
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
        </div>
    </div>
}